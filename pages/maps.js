import { useState } from "react";
import Geocode from "react-geocode";

const DireccionComponente = () => {
  const [direccion, setDireccion] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");

  const handleDireccionChange = (event) => {
    setDireccion(event.target.value);
  };

  const handleBuscarClick = async () => {
    try {
      const response = await Geocode.fromAddress(
        direccion,
        process.env.GOOGLE_MAPS_API_KEY
      );
      const { results } = response;
      if (results.length > 0) {
        const codigoPostal = results[0].address_components.find((component) =>
          component.types.includes("postal_code")
        );
        if (codigoPostal) {
          setCodigoPostal(codigoPostal.long_name);
        }
      }
    } catch (error) {
      console.log("Error al obtener el código postal:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={direccion}
        placeholder="aqui"
        onChange={handleDireccionChange}
      />
      <button onClick={handleBuscarClick}>Buscar</button>
      <p>Código Postal: {codigoPostal}</p>
    </div>
  );
};

export default DireccionComponente;
