import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TextField } from "@/components/form-fields/text-field";
import { NumberField } from "@/components/form-fields/number-field";

const validateSchema = yup
  .object({
    name: yup.string().required("Обязательное поле"),
    brand: yup.string().required("Обязательное поле"),
    sku: yup.string().required("Обязательное поле"),
    price: yup
      .number()
      .required("Обязательное поле")
      .typeError("Значение должно быть числом"),
  })
  .required();

export function CreateProductPage() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: yupResolver(validateSchema),
  });

  function onSubmit() {
    // Обработка данных
    navigate("/");
    toast.success("Данные успешно сохранены");
  }

  const { errors } = form.formState;

  return (
    <div className="flex justify-center">
      <div className="container my-10 bg-white p-8 rounded-2xl">
        <div>
          <h1 className="font-semibold text-4xl text-black text-center mb-3">
            Создание нового продукта
          </h1>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <div className="flex flex-col space-y-2">
              <label>Наименование</label>
              <TextField
                {...form.register("name")}
                error={errors.name?.message}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Цена</label>
              <NumberField
                {...form.register("price")}
                error={errors.price?.message}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Вендор</label>
              <TextField
                {...form.register("brand")}
                error={errors.brand?.message}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Артикуль</label>
              <TextField
                {...form.register("sku")}
                error={errors.sku?.message}
              />
            </div>
            <div className="flex space-x-2 justify-end">
              <button
                type="button"
                className="btn"
                onClick={() => navigate("/")}
              >
                Отмена
              </button>
              <button type="submit" className="btn btn-primary">
                Применить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
