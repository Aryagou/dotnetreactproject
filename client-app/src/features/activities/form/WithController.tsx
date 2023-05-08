import { Controller, useFormContext } from "react-hook-form";

interface Props {
  name: string;
  placeholder: string;
  type?: string;
}

export default function WithController(Component: any) {
  return function WithControllerComponent({ name, placeholder, type }: Props) {
    const { control } = useFormContext();
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Component {...field} placeholder={placeholder} type={type} />
        )}
      />
    );
  };
}
