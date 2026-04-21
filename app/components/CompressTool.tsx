"use client";

import { useState, useCallback, useRef } from "react";
import {
  Upload,
  Settings,
  Download,
  Trash2,
  Image as ImageIcon,
  FileImage,
  Check,
  AlertCircle,
  Loader2,
  Archive,
  X,
  Eye,
} from "lucide-react";
import {
  ImageFile,
  CompressionOptions,
  DEFAULT_OPTIONS,
  processBatch,
  formatBytes,
  compressionPercent,
  getOutputFilename,
} from "./compress";
import ComparisonSlider from "./ComparisonSlider";

const MAX_FREE_IMAGES = 10;
const MAX_PRO_IMAGES = 50;
const MAX_FREE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_PRO_SIZE = 50 * 1024 * 1024; // 50MB

export default function CompressTool() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [options, setOptions] = useState<CompressionOptions>(DEFAULT_OPTIONS);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [isPro] = useState(false); // Payment gate would flip this
  const [showSettings, setShowSettings] = useState(false);
  const [comparisonImage, setComparisonImage] = useState<ImageFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxImages = isPro ? MAX_PRO_IMAGES : MAX_FREE_IMAGES;
  const maxSize = isPro ? MAX_PRO_SIZE : MAX_FREE_SIZE;

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const imageFiles = fileArray.filter((f) =>
        f.type.startsWith("image/")
      );

      const remaining = maxImages - images.length;
      const toAdd = imageFiles.slice(0, remaining);

      const newImages: ImageFile[] = toAdd.map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        name: file.name,
        originalSize: file.size,
        type: file.type,
        preview: URL.createObjectURL(file),
        status: "pending" as const,
      }));

      setImages((prev) => [...prev, ...newImages]);
    },
    [images.length, maxImages]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) {
        URL.revokeObjectURL(img.preview);
        if (img.compressedPreview) URL.revokeObjectURL(img.compressedPreview);
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearAll = () => {
    images.forEach((img) => {
      URL.revokeObjectURL(img.preview);
      if (img.compressedPreview) URL.revokeObjectURL(img.compressedPreview);
    });
    setImages([]);
    setProgress({ done: 0, total: 0 });
  };

  const compress = async () => {
    const pending = images.filter((i) => i.status !== "done");
    if (pending.length === 0) return;

    setIsProcessing(true);
    setProgress({ done: 0, total: pending.length });

    // Reset pending images
    setImages((prev) =>
      prev.map((img) =>
        img.status !== "done" ? { ...img, status: "compressing" as const } : img
      )
    );

    const results = await processBatch(pending, options, (done, total) => {
      setProgress({ done, total });
    });

    setImages((prev) => {
      const map = new Map(results.map((r) => [r.id, r]));
      return prev.map((img) => map.get(img.id) || img);
    });

    setIsProcessing(false);
  };

  const downloadSingle = (img: ImageFile) => {
    if (!img.compressedBlob) return;
    const url = URL.createObjectURL(img.compressedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = getOutputFilename(img.name, options.outputFormat);
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAllAsZip = async () => {
    const done = images.filter((i) => i.status === "done" && i.compressedBlob);
    if (done.length === 0) return;

    const JSZip = (await import("jszip")).default;
    const { saveAs } = await import("file-saver");

    const zip = new JSZip();
    done.forEach((img) => {
      if (img.compressedBlob) {
        const filename = getOutputFilename(img.name, options.outputFormat);
        zip.file(filename, img.compressedBlob);
      }
    });

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "compresskit-images.zip");
  };

  const doneImages = images.filter((i) => i.status === "done");
  const totalOriginal = doneImages.reduce((s, i) => s + i.originalSize, 0);
  const totalCompressed = doneImages.reduce(
    (s, i) => s + (i.compressedSize || 0),
    0
  );
  const totalSaved = totalOriginal - totalCompressed;

  return (
    <section id="tool" className="py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Compress Your <span className="text-[var(--primary)]">Images</span>
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            Drop images below or click to browse. Everything happens in your browser.
          </p>
        </div>

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          className="drop-zone relative border-2 border-dashed border-[var(--card-border)] rounded-2xl p-12 text-center cursor-pointer hover:border-[var(--primary)] hover:bg-[var(--primary-light)] transition-all group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-[var(--primary-light)] flex items-center justify-center mx-auto mb-4 group-hover:bg-[var(--primary)] transition-colors">
            <Upload className="w-8 h-8 text-[var(--primary)] group-hover:text-white transition-colors" />
          </div>
          <p className="font-semibold text-lg mb-1">
            Drop images here or click to upload
          </p>
          <p className="text-sm text-[var(--muted)]">
            JPEG, PNG, WebP — up to {isPro ? "50" : "10"}MB each, max{" "}
            {isPro ? "50" : "10"} images
            {!isPro && (
              <span>
                {" "}
                — <a href="#pricing" className="text-[var(--primary)] underline">
                  Go Pro
                </a>{" "}
                for more
              </span>
            )}
          </p>
        </div>

        {/* Settings Panel */}
        <div className="mt-6">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <Settings className="w-4 h-4" />
            Compression Settings
            <span className="text-xs">
              {showSettings ? "▲" : "▼"}
            </span>
          </button>

          {showSettings && (
            <div className="mt-4 p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Quality */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Quality: {options.quality}%
                </label>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={options.quality}
                  onChange={(e) =>
                    setOptions({ ...options, quality: Number(e.target.value) })
                  }
                  className="w-full accent-[var(--primary)]"
                />
                <div className="flex justify-between text-xs text-[var(--muted)] mt-1">
                  <span>Smaller file</span>
                  <span>Better quality</span>
                </div>
              </div>

              {/* Format */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Output Format
                </label>
                <select
                  value={options.outputFormat}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      outputFormat: e.target.value as CompressionOptions["outputFormat"],
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--background)] text-sm"
                >
                  <option value="image/webp">WebP (Best)</option>
                  <option value="image/jpeg">JPEG</option>
                  <option value="image/png">PNG</option>
                </select>
              </div>

              {/* Max Width */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Max Width (px)
                </label>
                <input
                  type="number"
                  placeholder="No limit"
                  value={options.maxWidth || ""}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      maxWidth: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--background)] text-sm"
                />
              </div>

              {/* Scale */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Scale: {options.scalePercent || 100}%
                </label>
                <input
                  type="range"
                  min={10}
                  max={200}
                  step={5}
                  value={options.scalePercent || 100}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      scalePercent: Number(e.target.value),
                    })
                  }
                  className="w-full accent-[var(--primary)]"
                />
                <div className="flex justify-between text-xs text-[var(--muted)] mt-1">
                  <span>10%</span>
                  <span>200%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Image List */}
        {images.length > 0 && (
          <div className="mt-8">
            {/* Stats bar */}
            {doneImages.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 mb-6 p-4 rounded-xl bg-[var(--secondary)]/10 border border-[var(--secondary)]/20">
                <div className="flex items-center gap-2 text-sm font-medium text-[var(--secondary)]">
                  <Check className="w-4 h-4" />
                  {doneImages.length} image{doneImages.length !== 1 ? "s" : ""} compressed
                </div>
                <div className="text-sm text-[var(--muted)]">
                  {formatBytes(totalOriginal)} → {formatBytes(totalCompressed)}
                </div>
                <div className="text-sm font-semibold text-[var(--secondary)]">
                  {compressionPercent(totalOriginal, totalCompressed)}% saved ({formatBytes(totalSaved)})
                </div>
                <button
                  onClick={downloadAllAsZip}
                  className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--secondary)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Archive className="w-4 h-4" />
                  Download ZIP
                </button>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={compress}
                disabled={isProcessing || images.every((i) => i.status === "done")}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Compressing... {progress.done}/{progress.total}
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-4 h-4" />
                    {images.every((i) => i.status === "done")
                      ? "All Done!"
                      : "Compress All"}
                  </>
                )}
              </button>
              <button
                onClick={clearAll}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--card-border)] text-sm hover:bg-[var(--muted-bg)] transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>

            {/* Image grid */}
            <div className="space-y-3">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] group"
                >
                  {/* Preview */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-[var(--muted-bg)] shrink-0 flex items-center justify-center">
                    {img.status === "done" && img.compressedPreview ? (
                      <img
                        src={img.compressedPreview}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileImage className="w-6 h-6 text-[var(--muted)]" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{img.name}</p>
                      {img.status === "done" && (
                        <span className="px-2 py-0.5 rounded-full bg-[var(--secondary)]/10 text-[var(--secondary)] text-xs font-medium shrink-0">
                          -{compressionPercent(img.originalSize, img.compressedSize || 0)}%
                        </span>
                      )}
                      {img.status === "error" && (
                        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-medium shrink-0">
                          Error
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[var(--muted)] mt-1">
                      <span>{formatBytes(img.originalSize)}</span>
                      {img.status === "done" && (
                        <>
                          <span>→</span>
                          <span className="text-[var(--secondary)] font-medium">
                            {formatBytes(img.compressedSize || 0)}
                          </span>
                          {img.dimensions && (
                            <>
                              <span>|</span>
                              <span>
                                {img.compressedDimensions?.width}×{img.compressedDimensions?.height}
                              </span>
                            </>
                          )}
                        </>
                      )}
                      {img.status === "compressing" && (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {img.status === "done" && (
                      <>
                        <button
                          onClick={() => setComparisonImage(img)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--muted-bg)] transition-colors"
                          title="Compare before/after"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => downloadSingle(img)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--muted-bg)] transition-colors text-[var(--secondary)]"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => removeImage(img.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Modal */}
        {comparisonImage && (
          <ComparisonSlider
            image={comparisonImage}
            onClose={() => setComparisonImage(null)}
          />
        )}
      </div>
    </section>
  );
}
