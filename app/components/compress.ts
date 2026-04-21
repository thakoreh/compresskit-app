"use client";

/**
 * CompressKit — Core Image Compression Engine
 * All processing is done client-side using the Canvas API.
 */

export interface CompressionOptions {
  quality: number; // 0-100
  outputFormat: "image/jpeg" | "image/png" | "image/webp";
  maxWidth?: number;
  maxHeight?: number;
  maintainAspectRatio: boolean;
  scalePercent?: number;
}

export interface ImageFile {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  type: string;
  preview: string;
  compressedPreview?: string;
  compressedBlob?: Blob;
  compressedSize?: number;
  status: "pending" | "compressing" | "done" | "error";
  error?: string;
  dimensions?: { width: number; height: number };
  compressedDimensions?: { width: number; height: number };
}

export const DEFAULT_OPTIONS: CompressionOptions = {
  quality: 75,
  outputFormat: "image/webp",
  maintainAspectRatio: true,
};

/**
 * Load an image file into an HTMLImageElement
 */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to load image: ${file.name}`));
    };
    img.src = url;
  });
}

/**
 * Calculate output dimensions based on options
 */
function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  options: CompressionOptions
): { width: number; height: number } {
  let width = originalWidth;
  let height = originalHeight;

  // Apply scale percentage
  if (options.scalePercent && options.scalePercent !== 100) {
    width = Math.round((width * options.scalePercent) / 100);
    height = Math.round((height * options.scalePercent) / 100);
  }

  // Apply max dimensions
  if (options.maxWidth && width > options.maxWidth) {
    if (options.maintainAspectRatio) {
      height = Math.round((height * options.maxWidth) / width);
    }
    width = options.maxWidth;
  }
  if (options.maxHeight && height > options.maxHeight) {
    if (options.maintainAspectRatio) {
      width = Math.round((width * options.maxHeight) / height);
    }
    height = options.maxHeight;
  }

  return { width: Math.max(1, width), height: Math.max(1, height) };
}

/**
 * Compress a single image file
 */
export async function compressImage(
  file: File,
  options: CompressionOptions
): Promise<{
  blob: Blob;
  width: number;
  height: number;
}> {
  const img = await loadImage(file);
  const { width, height } = calculateDimensions(
    img.naturalWidth,
    img.naturalHeight,
    options
  );

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context not available");

  // Use high-quality rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, width, height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve({ blob, width, height });
        } else {
          reject(new Error("Failed to compress image"));
        }
      },
      options.outputFormat,
      options.quality / 100
    );
  });
}

/**
 * Process a single ImageFile with progress tracking
 */
export async function processImageFile(
  imageFile: ImageFile,
  options: CompressionOptions
): Promise<ImageFile> {
  try {
    const img = await loadImage(imageFile.file);
    const originalDimensions = {
      width: img.naturalWidth,
      height: img.naturalHeight,
    };

    const { blob, width, height } = await compressImage(
      imageFile.file,
      options
    );

    const compressedPreview = URL.createObjectURL(blob);

    return {
      ...imageFile,
      status: "done",
      compressedBlob: blob,
      compressedSize: blob.size,
      compressedPreview,
      dimensions: originalDimensions,
      compressedDimensions: { width, height },
    };
  } catch (error) {
    return {
      ...imageFile,
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Process multiple images in parallel
 */
export async function processBatch(
  images: ImageFile[],
  options: CompressionOptions,
  onProgress?: (completed: number, total: number) => void
): Promise<ImageFile[]> {
  const results: ImageFile[] = [];
  let completed = 0;

  // Process in chunks of 4 for performance
  const chunkSize = 4;
  for (let i = 0; i < images.length; i += chunkSize) {
    const chunk = images.slice(i, i + chunkSize);
    const chunkResults = await Promise.all(
      chunk.map(async (img) => {
        const result = await processImageFile(img, options);
        completed++;
        onProgress?.(completed, images.length);
        return result;
      })
    );
    results.push(...chunkResults);
  }

  return results;
}

/**
 * Format bytes to human-readable string
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

/**
 * Calculate compression percentage
 */
export function compressionPercent(
  originalSize: number,
  compressedSize: number
): number {
  if (originalSize === 0) return 0;
  return Math.round(((originalSize - compressedSize) / originalSize) * 100);
}

/**
 * Get file extension for a mime type
 */
export function getFormatExtension(format: string): string {
  switch (format) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    default:
      return "jpg";
  }
}

/**
 * Generate output filename
 */
export function getOutputFilename(
  originalName: string,
  format: string
): string {
  const baseName = originalName.replace(/\.[^.]+$/, "");
  const ext = getFormatExtension(format);
  return `${baseName}-compressed.${ext}`;
}
