import { useFormContext } from "react-hook-form";
import { useMap } from "../../../../states/mapContext";
import styles from "./style.module.css";
import { getRoute } from "../../utils/getRoute";
export function Form() {
  const { mapRef } = useMap();
  const methods = useFormContext<{ origin: string; destination: string }>();
  const { register, handleSubmit, setValue } = methods;
  const handleClear = (inputId: "origin" | "destination") => {
    setValue(inputId, "");
    const view = mapRef.current!.view;
    const graphic = view?.graphics.find(
      (graphic) => graphic.attributes.role === inputId
    );

    if (graphic) {
      view.graphics.remove(graphic);
    }
  };
  const onSubmit = () => {
    const view = mapRef.current!.view;
    if (!view) return;
    // mapRef.current?.view?.graphics.removeAll();
    getRoute(view.graphics.toArray(), view);
  };
  return (
    // eslint-disable-next-line react-hooks/refs
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputGourp}>
        <input
          type="text"
          placeholder="current location"
          id="origin"
          {...register("origin", { required: true })}
          readOnly
        />
        <button type="button" onClick={() => handleClear("origin")}>
          clear
        </button>
      </div>
      <div
        className={styles.inputGourp}
        onClick={() => handleClear("destination")}
      >
        <input
          type="text"
          placeholder="destination"
          id="destination"
          {...register("destination", { required: true })}
          readOnly
        />
        <button type="button" onClick={() => handleClear("destination")}>
          clear
        </button>
      </div>
      <button type="submit" id="submit">
        Submit
      </button>
    </form>
  );
}
