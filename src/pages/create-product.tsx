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
    price: yup.string().required("Обязательное поле"),
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
    <div>
      <h1>Создание нового продукта</h1>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <label>Наименование</label>
          <TextField {...form.register("name")} error={errors.name?.message} />
        </div>
        <div>
          <label>Цена</label>
          <NumberField
            {...form.register("price")}
            error={errors.price?.message}
          />
        </div>
        <div>
          <label>Вендор</label>
          <TextField
            {...form.register("brand")}
            error={errors.brand?.message}
          />
        </div>
        <div>
          <label>Артикуль</label>
          <TextField {...form.register("sku")} error={errors.sku?.message} />
        </div>
        <div>
          <button type="button">Отмена</button>
          <button type="submit">Применить</button>
        </div>
      </form>
    </div>
  );
}
