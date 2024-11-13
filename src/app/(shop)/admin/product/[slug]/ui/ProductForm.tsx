"use client";

import { createUpdateProduct, deleteProductImage } from "@/actions";
import { ProductImage } from "@/components";
import { Product, ProductStock } from "@/interfaces";
import { sleep } from "@/utils";
import clsx from "clsx";
import { FormikTouched, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { unknown } from "zod";

interface Props {
  allSlugs: Array<{ slug: string }>;
  product: Product;
  categories: Array<{ [key: string]: string }>;
}

const sizes: Array<string> = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

interface FormImput {
  id?: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  tags: string;
  gender: string;
  XS: number;
  S: number;
  M: number;
  L: number;
  XL: number;
  XXL: number;
  XXXL: number;
  categoryId: string;
  images?: File[];
}

function deleteSpaceInString(value: string, originalValue: string) {
  return value.trim();
}

export const ProductForm = ({ product, categories, allSlugs }: Props) => {
  const router = useRouter();

  const slugAllreadyInuse = allSlugs.map((slugs) => {
    if (slugs.slug == product.slug) return;
    return slugs.slug;
  });

  const [disableButtons, setDisableButtons] = useState(false);

  const deleteImage = async (id: number, url: string) => {
    setDisableButtons(true);
    await deleteProductImage(id, url);
    setDisableButtons(false);
  };

  const [load, setLoad] = useState(true);
  useEffect(() => {
    setLoad(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik<FormImput>({
    initialValues: {
      title: product.title || "",
      slug: product.slug || "",
      description: product.description || "",
      price: product.price || 0,
      tags: product.tags?.join("") || "",
      gender: product.gender,
      categoryId: product.categoryId!,
      XS: product.producStock?.XS || 0,
      S: product.producStock?.S || 0,
      M: product.producStock?.M || 0,
      L: product.producStock?.L || 0,
      XL: product.producStock?.XL || 0,
      XXL: product.producStock?.XXL || 0,
      XXXL: product.producStock?.XXXL || 0,
      images: undefined,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(255, "Must be 255 characters or less")
        .required("Required"),
      slug: Yup.string()
        .transform(deleteSpaceInString)
        .max(255, "Must be 255 characters or less")
        .required("Required")
        .notOneOf([...slugAllreadyInuse, "new"], "This Slug Allready in use"),
      description: Yup.string()
        .max(1500, "Must be 15 characters or less")
        .required("Required"),
      price: Yup.number().required("Required"),
      tags: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
      categoryId: Yup.string().required("Required"),
      XS: Yup.number()
        .required("Required")
        .min(0, "Must be greater than or equal to 0"),
      S: Yup.number()
        .required("Required")
        .min(0, "Must be greater than or equal to 0"),
      M: Yup.number()
        .required("Required")
        .min(0, "Must be greater than or equal to 0"),
      L: Yup.number()
        .required("Required")
        .min(0, "Must be greater than or equal to 0"),
      XL: Yup.number()
        .required("Required")
        .min(0, "Must be greater than or equal to 0"),
      XXL: Yup.number()
        .required("Required")
        .min(0, "Must be greater than or equal to 0"),
      XXXL: Yup.number()
        .required("Required")
        .min(0, "Must be greater than or equal to 0"),
    }),
    onSubmit: async (data) => {
      const { images, ...productToSave } = data;
      let dataTosabe: any = { ...productToSave };
      setDisableButtons(true);

      dataTosabe.inStock = 0;
      dataTosabe.categoryId = String(dataTosabe.categoryId);
      dataTosabe.gender = productToSave.gender;
      dataTosabe.sizes = sizes.join(",");
      dataTosabe.id = product.id;

      let imagesToMap: Array<File> = [];

      imagesToMap = images ? [...images] : [];

      const filePromise = imagesToMap!.map(async (image: any) => {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");
        return base64Image;
      });

      const imagesbase64 = (await Promise.all(filePromise)) || [];

      const responce = await createUpdateProduct({
        data: dataTosabe,
        images: imagesbase64 ? imagesbase64 : [],
      });

      setDisableButtons(false);
      if (!responce.ok) {
        alert(responce.message);
        return;
      }

      router.replace(`/admin/product/${responce.product?.slug}`);
    },
  });

  return load === true ? (
    <span>loading</span>
  ) : (
    <div className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Textos */}
      {/* <h1>{JSON.stringify(formik.values)}</h1> */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Title</span>
          <input
            //  className="p-2 border rounded-md bg-gray-200"
            className={clsx("px-5 py-2 border bg-gray-200 rounded", {
              "border-red-500": formik.errors.title && formik.touched.title,
            })}
            id="title"
            name="title"
            type="text"
            onChange={(event) => {
              formik.handleChange(event);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          <span className="text-red-500 mb-5 mt-2">
            {formik.touched.title && formik.errors.title ? (
              <div>{String(formik.errors.title)}</div>
            ) : null}
          </span>
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            className={clsx("px-5 py-2 border bg-gray-200 rounded", {
              "border-red-500": formik.errors.slug && formik.touched.slug,
            })}
            id="slug"
            name="slug"
            type="text"
            onChange={(event) => {
              formik.handleChange(event);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.slug}
          />
          <span className="text-red-500 mb-5 mt-2">
            {formik.touched.slug && formik.errors.slug ? (
              <div>{String(formik.errors.slug)}</div>
            ) : null}
          </span>
        </div>

        <div className="flex flex-col mb-2">
          <span>Description</span>

          <textarea
            className={clsx("px-5 py-2 border bg-gray-200 rounded", {
              "border-red-500":
                formik.errors.description && formik.touched.description,
            })}
            id="description"
            name="description"
            rows={10}
            onChange={(event) => {
              formik.handleChange(event);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          <span className="text-red-500 mb-5 mt-2">
            {formik.touched.description && formik.errors.description ? (
              <div>{String(formik.errors.description)}</div>
            ) : null}
          </span>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>

          <input
            className={clsx("px-5 py-2 border bg-gray-200 rounded", {
              "border-red-500": formik.errors.price && formik.touched.price,
            })}
            id="price"
            name="price"
            type="number"
            onChange={(event) => {
              formik.handleChange(event);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          <span className="text-red-500 mb-5 mt-2">
            {formik.touched.price && formik.errors.price ? (
              <div>{String(formik.errors.price)}</div>
            ) : null}
          </span>
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            className={clsx("px-5 py-2 border bg-gray-200 rounded", {
              "border-red-500": formik.errors.tags && formik.touched.tags,
            })}
            id="tags"
            name="tags"
            type="text"
            onChange={(event) => {
              formik.handleChange(event);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.tags}
          />
          <span className="text-red-500 mb-5 mt-2">
            {formik.touched.tags && formik.errors.tags ? (
              <div>{String(formik.errors.tags)}</div>
            ) : null}
          </span>
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className={clsx("px-5 py-2 border bg-gray-200 rounded", {
              "border-red-500": formik.errors.gender && formik.touched.gender,
            })}
            id="gender"
            name="gender"
            onChange={(event) => {
              formik.handleChange(event);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Category</span>
          <select
            className={clsx("px-5 py-2 border bg-gray-200 rounded", {
              "border-red-500":
                formik.errors.categoryId && formik.touched.categoryId,
            })}
            id="categoryId"
            name="categoryId"
            onChange={(event) => {
              formik.handleChange(event);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.categoryId}
          >
            <option value="">[ Seleccione ]</option>
            {categories.map(({ name, id }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <span className="text-red-500 mb-5 mt-2">
            {formik.touched.categoryId && formik.errors.categoryId ? (
              <div>{String(formik.errors.categoryId)}</div>
            ) : null}
          </span>
        </div>

        <button
          className={clsx("btn-primary w-full", {
            "btn-disabled": disableButtons,
          })}
          disabled={disableButtons}
          onClick={() => {
            formik.submitForm();
          }}
        >
          Save
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col mb-2">
          <span>Sizes</span>
          {sizes.map((size: any) => (
            <div
              key={String(size)}
              className={clsx(
                "grid grid-cols-1 p-2 border cursor-pointer rounded-md mr-2 mb-2 transition-all text-center",
                {
                  // "border-red-500": formik.touched(size) && formik.errors?([size]),
                }
              )}
            >
              <div>
                {/* (obj as { [k in string]: any })[key] */}
                {`${size} ${
                  product.producStock?.[size as keyof ProductStock] || 0
                }  :`}
                <input
                  className={clsx(
                    "ml-4 px-5 py-2 border bg-gray-200 rounded w-24",
                    {
                      "border-red-500":
                        formik.touched[
                          size as keyof FormikTouched<FormImput>
                        ] &&
                        formik.errors[size as keyof FormikTouched<FormImput>],
                    }
                  )}
                  id={size}
                  name={size}
                  type="number"
                  min={0}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                  onBlur={formik.handleBlur}
                  value={(formik.values as any)[size]}
                />
              </div>
              <div
                className={clsx({
                  "text-red-500 mb-5 mt-2 border-red-500":
                    formik.touched[size as keyof FormikTouched<FormImput>] &&
                    formik.errors[size as keyof FormikTouched<FormImput>],
                })}
              >
                {/* {formik.touched[size as keyof FormikTouched<FormImput>] &&
                formik.errors[size as keyof FormikTouched<FormImput>]
                  ? formik.errors[size as keyof FormikTouched<FormImput>]
                  : null} */}
              </div>
            </div>
          ))}

          <div className="flex flex-col mb-2">
            <span>Pictures</span>
            <input
              id={"images"}
              name={"images"}
              onBlur={formik.handleBlur}
              onChange={(event) => {
                formik.setFieldValue("images", event.currentTarget.files);
              }}
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end ">
            {product.images
              ? product.images.map((image) => (
                  <div key={image.id}>
                    <ProductImage
                      alt={product.title ?? ""}
                      width={300}
                      height={300}
                      className="rounded-t shadow-md flex bg-blue-200"
                      src={`${image.url}`}
                    />

                    <button
                      type="button"
                      onClick={() => deleteImage(image.id!, image.url!)}
                      className={clsx("w-full rounded-b-xl", {
                        "btn-disabled": disableButtons,
                        "btn-danger": !disableButtons,
                      })}
                      disabled={disableButtons}
                    >
                      Delete
                    </button>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};
