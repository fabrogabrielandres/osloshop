"use client";
import { deleteUserAddress, getUserAddress, setUserAddress } from "@/actions";
import { Country } from "@/interfaces";
import { useAdressStore } from "@/store";
import clsx from "clsx";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

interface FormAdressImput {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phoneNumber: string;
  rememberAdress: boolean;
}
interface Props {
  countries: Country[];
}

export const FormAndress = ({ countries }: Props) => {
  const setAddress = useAdressStore((state) => state.setAddress);
  const address = useAdressStore((state) => state.address);
  const [load, setLoad] = useState(true);
  const user = useSession();
  const userId = user.data?.user.id;

  const router = useRouter();

  useEffect(() => {
    const userAddressDb = async (userId: string) => {
      const addresFromDb = await getUserAddress({ userId: userId! });
      setAddress({ ...addresFromDb });
    };
    userAddressDb(userId!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoad(false);
    formik.resetForm({
      values: {
        firstName: address.firstName,
        lastName: address.lastName,
        address: address.address,
        address2: address.address2,
        postalCode: address.postalCode,
        city: address.city,
        country: address.country,
        phoneNumber: address.phoneNumber,
        rememberAdress: false,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const formik = useFormik<FormAdressImput>({
    initialValues: {
      ...address,
      rememberAdress: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      address: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      address2: Yup.string(),
      postalCode: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      city: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      country: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      phoneNumber: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      rememberAdress: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      const { rememberAdress, ...rest } = values;
      setAddress({ ...values });
      if (values.rememberAdress) {
        await setUserAddress(rest, userId!);
        formik.resetForm({
          values: {
            firstName: values.firstName,
            lastName: values.lastName,
            address: values.address,
            address2: values.address2,
            postalCode: values.postalCode,
            city: values.city,
            country: values.country,
            phoneNumber: values.phoneNumber,
            rememberAdress: values.rememberAdress,
          },
        });
        router.push("/checkout");
      } else {
        await deleteUserAddress({ userId: userId! });
        router.push("/checkout");
      }
    },
  });

  return load === true ? (
    <span>{JSON.stringify(address)}</span>
  ) : (
    <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
      <span>{JSON.stringify(address)}</span>
      <div className="flex flex-col mb-2">
        <span>Nombres</span>
        <input
          //  className="p-2 border rounded-md bg-gray-200"
          className={clsx("px-5 py-2 border bg-gray-200 rounded", {
            "border-red-500":
              formik.errors.firstName && formik.touched.firstName,
          })}
          id="firstName"
          name="firstName"
          type="text"
          onChange={(event) => {
            formik.handleChange(event);
            setAddress({ ...formik.values, firstName: event.target.value });
          }}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        <span className="text-red-500 mb-5 mt-2">
          {formik.touched.firstName && formik.errors.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null}
        </span>
      </div>

      <div className="flex flex-col mb-2">
        <span>Apellidos</span>
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded", {
            "border-red-500": formik.errors.lastName && formik.touched.lastName,
          })}
          id="lastName"
          name="lastName"
          type="text"
          onChange={(event) => {
            formik.handleChange(event);
            setAddress({ ...formik.values, lastName: event.target.value });
          }}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        <span className="text-red-500 mb-5 mt-2">
          {formik.touched.lastName && formik.errors.lastName ? (
            <div>{formik.errors.lastName}</div>
          ) : null}
        </span>
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección</span>
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded", {
            "border-red-500": formik.errors.address && formik.touched.address,
          })}
          id="address"
          name="address"
          type="text"
          onChange={(event) => {
            formik.handleChange(event);
            setAddress({ ...formik.values, address: event.target.value });
          }}
          onBlur={formik.handleBlur}
          value={formik.values.address}
        />
        <span className="text-red-500 mb-5 mt-2">
          {formik.touched.address && formik.errors.address ? (
            <div>{formik.errors.address}</div>
          ) : null}
        </span>
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección 2 (opcional)</span>
        <input
          className="px-5 py-2 border bg-gray-200 rounded"
          id="address2"
          name="address2"
          type="text"
          onChange={(event) => {
            formik.handleChange(event);
            setAddress({ ...formik.values, address2: event.target.value });
          }}
          onBlur={formik.handleBlur}
          value={formik.values.address2}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Código postal</span>
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded", {
            "border-red-500":
              formik.errors.postalCode && formik.touched.postalCode,
          })}
          id="postalCode"
          name="postalCode"
          type="text"
          onChange={(event) => {
            formik.handleChange(event);
            setAddress({ ...formik.values, postalCode: event.target.value });
          }}
          onBlur={formik.handleBlur}
          value={formik.values.postalCode}
        />
        <span className="text-red-500 mb-5 mt-2">
          {formik.touched.postalCode && formik.errors.postalCode ? (
            <div>{formik.errors.postalCode}</div>
          ) : null}
        </span>
      </div>

      <div className="flex flex-col mb-2">
        <span>Ciudad</span>
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded", {
            "border-red-500": formik.errors.city && formik.touched.city,
          })}
          id="city"
          name="city"
          type="text"
          onChange={(event) => {
            formik.handleChange(event);
            setAddress({ ...formik.values, city: event.target.value });
          }}
          onBlur={formik.handleBlur}
          value={formik.values.city}
        />
        <span className="text-red-500 mb-5 mt-2">
          {formik.touched.city && formik.errors.city ? (
            <div>{formik.errors.city}</div>
          ) : null}
        </span>
      </div>

      <div className="flex flex-col mb-2">
        <span>País</span>
        <select
          className={clsx("px-5 py-2 border bg-gray-200 rounded", {
            "border-red-500": formik.errors.country && formik.touched.country,
          })}
          id="country"
          name="country"
          onChange={(event) => {
            formik.handleChange(event);
            setAddress({ ...formik.values, country: event.target.value });
          }}
          onBlur={formik.handleBlur}
          value={formik.values.country}
        >
          <option value="">[ Seleccione ]</option>
          {countries.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <span className="text-red-500 mb-5 mt-2">
          {formik.touched.country && formik.errors.country ? (
            <div>{formik.errors.country}</div>
          ) : null}
        </span>
      </div>

      <div className="flex flex-col mb-2">
        <span>Teléfono</span>
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded", {
            "border-red-500":
              formik.errors.phoneNumber && formik.touched.phoneNumber,
          })}
          id="phoneNumber"
          name="phoneNumber"
          onChange={(event) => {
            formik.handleChange(event);
            setAddress({ ...formik.values, phoneNumber: event.target.value });
          }}
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber}
        />
        <span className="text-red-500 mb-5 mt-2">
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div>{formik.errors.phoneNumber}</div>
          ) : null}
        </span>
      </div>

      <div className="flex flex-col mb-2">
        <div className="inline-flex items-center mb-2 ">
          <label
            className="relative flex cursor-pointer items-center rounded-full "
            htmlFor="checkbox"
            data-ripple-dark="true"
          >
            <input
              type="checkbox"
              className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              // checked
              id="rememberAdress"
              name="rememberAdress"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
          <span className="ml-4"> ¿Desea guardar la direccion?</span>
        </div>
        <button
          onClick={formik.submitForm}
          className={clsx("flex w-full sm:w-1/2 justify-center mt-4 ", {
            "btn-primary": formik.isValid,
            "btn-secondary": !formik.isValid && !formik.dirty,
          })}
          disabled={!formik.isValid && !formik.dirty}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
