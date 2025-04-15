"use client"

import "cropperjs/dist/cropper.css";

import ReactCropper, { ReactCropperElement, ReactCropperProps } from "react-cropper";

export const Cropper = (props: ReactCropperProps & React.RefAttributes<ReactCropperElement | HTMLImageElement>) => {
  return (
    <ReactCropper {...props} />
  )
}

export type { ReactCropperElement, ReactCropperProps }