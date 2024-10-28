"use client";

import { ImageInProduct, Product, ProductStock } from "@/interfaces";
import { Size } from "@prisma/client";
import clsx from "clsx";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as Yup from "yup";

interface Props {
  product: Product;
  categories: Array<any>;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormAdressImput {
  id?: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  tags: string;
  gender: string;
  images?: Array<ImageInProduct>;
  // producStock?: ProductStock;

  // sizes: Size[];
  producStock?: ProductStock | null;
  // gender: Categorie;
}

export const ProductForm = ({ product, categories }: Props) => {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setLoad(false);
    console.log("product", product!);
    console.log("categories", categories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik<FormAdressImput | any>({
    initialValues: {
      title: product.title,
      slug: product.title,
      description: product.description,
      price: product.price,
      tags: product.tags?.join(",") || [] || "",
      gender: product.gender,
      XS: product.producStock?.XS,
      S: product.producStock?.S,
      M: product.producStock?.M,
      L: product.producStock?.L,
      XL: product.producStock?.XL,
      XXL: product.producStock?.XXL,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(150, "Must be 15 characters or less")
        .required("Required"),
      slug: Yup.string()
        .max(1500, "Must be 15 characters or less")
        .required("Required"),
      description: Yup.string()
        .max(1500, "Must be 15 characters or less")
        .required("Required"),
      price: Yup.number().required("Required"),
      tags: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
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
    }),
    onSubmit: async (values) => {
      console.log("hola", values);

      console.log("value", values);
    },
  });

  return load === true ? (
    <span>loading</span>
  ) : (
    <div className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
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
          <span>Descripción</span>

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
          <select className="p-2 border rounded-md bg-gray-200">
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className={clsx("px-5 py-2 border bg-gray-200 rounded", {
              "border-red-500":
                formik.errors.categories && formik.touched.categories,
            })}
            id="categories"
            name="categories"
            onChange={(event) => {
              formik.handleChange(event);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.country}
          >
            <option value="">[ Seleccione ]</option>
            {categories.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <span className="text-red-500 mb-5 mt-2">
            {formik.touched.categories && formik.errors.categories ? (
              <div>{String(formik.errors.categories)}</div>
            ) : null}
          </span>
        </div>

        <button
          className="btn-primary w-full"
          onClick={() => {
            formik.submitForm();
          }}
        >
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col mb-2">
          <span>Tallas</span>
          {sizes.map((size) => (
            <div
              key={String(size)}
              className={clsx(
                "grid grid-cols-1 gap-2 p-2 border cursor-pointer rounded-md mr-2 mb-2 transition-all text-center",
                {
                  "border-red-500": formik.touched[size] && formik.errors[size],
                }
              )}
            >
              <div>
                {`${size} ${(product.producStock as any)[size]} :`}
                <input
                  className={clsx(
                    "ml-4 px-5 py-2 border bg-gray-200 rounded w-24",
                    {
                      "border-red-500":
                        formik.touched[size] && formik.errors[size],
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
                  value={formik.values.size}
                />
              </div>
              <div
                className={clsx({
                  "text-red-500 mb-5 mt-2 border-red-500":
                    formik.touched[size] && formik.errors[size],
                })}
              >
                {formik.touched[size] && formik.errors[size]
                  ? String(formik.errors[size])
                  : null}
              </div>
            </div>
          ))}

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            {/* <input
              type="file"
              { ...register('images') }
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
            /> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {product.images?.map((image) => (
              <div key={image.id}>
                <Image
                  alt={product.title ?? ""}
                  src={`/products/${image.url}`}
                  width={300}
                  height={300}
                  className="rounded-t shadow-md"
                />

                <button
                  type="button"
                  // onClick={() => deleteProductImage(image.id, image.url)}
                  className="btn-danger w-full rounded-b-xl"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
