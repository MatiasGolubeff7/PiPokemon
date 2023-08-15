import { useSelector } from "react-redux";
import validationPoke from "../../Components/Form/validationPoke";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import style from "./CreatePoke.module.css";

const initialPoke = {
  name: "",
  img: "",
  health: "",
  speed: "",
  defense: "",
  attack: "",
  height: "",
  weight: "",
  types: [],
};

function CreatePoke() {
  const types = useSelector((state) => state.types);
  const [input, setInput] = useState(initialPoke);
  const [disabler, setDisabler] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (disabler) {
      setDisabler(false);
    }
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validationPoke({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const handleChangeTypes = (e) => {
    //convertimos todos los clicks en un objeto
    const type = JSON.parse(e.target.value);

    if (input.types.includes(type)) {
      setInput({
        ...input,

        types: [...input.types.filter((t) => t !== type)],
      });

      setErrors(
        validationPoke({
          ...input,

          types: [...input.types.filter((t) => t !== type)], //setea los tipos
        })
      );
    } else {
      setInput({
        ...input,
        types: [...input.types, type],
      });
      setErrors(
        validationPoke({
          ...input,
          types: [...input.types, type],
        })
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.entries(errors).length) {
      const response = await axios.post(
        "http://localhost:3001/pokemons",
        input
      );
      if (response.data.message === "Pokemon successfully created") {
        navigate(`/details/${response.data.new_pokemon.id}`);
      }
    }
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <div>
      <form onSubmit={handleSubmit} className={style.formCreate}>
        <div>
          <label> Name</label>
          <input
            onChange={handleChange}
            value={input.name}
            name="name"
            className={style.inputCreate}
          />
          {errors.name ? <label>{errors.name}</label> : <label>&nbsp;</label>}
        </div>
        <div>
          <label>Image URL</label>
          <input
            onChange={handleChange}
            value={input.img}
            name="img"
            className={style.inputCreate}
          />
          {errors.img ? <label>{errors.img}</label> : <label>&nbsp;</label>}
        </div>

        <div>
          <label> vida</label>
          <input
            onChange={handleChange}
            value={input.health}
            type="number"
            name="health"
            className={style.inputCreate}
          />
          {errors.health ? (
            <label>{errors.health}</label>
          ) : (
            <label>&nbsp;</label>
          )}
        </div>
        <div>
          <label> velocidad</label>
          <input
            onChange={handleChange}
            value={input.speed}
            type="number"
            name="speed"
            className={style.inputCreate}
          />
          {errors.speed ? <label>{errors.speed}</label> : <label>&nbsp;</label>}
        </div>
        <div>
          <label> ataque</label>
          <input
            onChange={handleChange}
            value={input.attack}
            type="number"
            name="attack"
            className={style.inputCreate}
          />
          {errors.attack ? (
            <label>{errors.attack}</label>
          ) : (
            <label>&nbsp;</label>
          )}
        </div>
        <div>
          <label> Defensa</label>
          <input
            onChange={handleChange}
            value={input.defense}
            type="number"
            name="defense"
            className={style.inputCreate}
          />
          {errors.defense ? (
            <label>{errors.defense}</label>
          ) : (
            <label>&nbsp;</label>
          )}
        </div>
        <div>
          <label> altura</label>
          <input
            onChange={handleChange}
            value={input.height}
            type="number"
            name="height"
            className={style.inputCreate}
          />
          {errors.height ? (
            <label>{errors.height}</label>
          ) : (
            <label>&nbsp;</label>
          )}
        </div>
        <div>
          <label> Peso</label>
          <input
            onChange={handleChange}
            value={input.weight}
            type="number"
            name="weight"
            className={style.inputCreate}
          />
          {errors.weight ? (
            <label>{errors.weight}</label>
          ) : (
            <label>&nbsp;</label>
          )}
        </div>
        <div>
          <label> Tipo:</label>
          {errors.types ? <label>{errors.types}</label> : <label>&nbsp;</label>}

          <div className={style.check}>
            {types?.map((t) => {
              return (
                <div key={t.id}>
                  <label>{t.name}:</label>
                  <input
                    onChange={handleChangeTypes}
                    value={`${t.id}`}
                    type="checkbox"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <input
            disabled={disabler || Object.entries(errors).length ? true : false}
            value="Crear"
            type="submit"
          />
          <Link to={`/home`}>
            <button>Home</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreatePoke;

// import { useDispatch, useSelector } from "react-redux";
// import validationPoke from "../../Components/Form/validationPoke";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import style from "./CreatePoke.module.css";
// import { getTypes } from "../../redux/actions";

// const initialPoke = {
//   name: "",
//   img: "",
//   health: "",
//   speed: "",
//   defense: "",
//   attack: "",
//   height: "",
//   weight: "",
//   types: [],
// };

// const CreatePoke = () => {
//   const types = useSelector((state) => state.types);
//   const [input, setInput] = useState(initialPoke);
//   const [disabler, setDisabler] = useState(true);
//   const [error, setError] = useState({});
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getTypes());
//   }, [dispatch]);

//   const handleChange = (ev) => {
//     if (disabler) {
//       setDisabler(false);
//     }

//     setInput({
//       ...input,
//       [ev.target.name]: ev.target.value,
//     });
//     setError(
//       validationPoke({
//         ...input,
//         [ev.target.name]: ev.target.value,
//       })
//     );
//   };

//   useEffect(() => {
//     console.log(input);
//   }, [dispatch]);

//   const handleChangeTypes = (ev) => {
//     const type = ev.target.value; //obtenemos el numero de id del tipo de pookemon
//     console.log(ev.target.value);

//     // if (type.length > 2)
//     if (input.types.includes(type)) {
//       // Si types incluye el numero de id del tipo de pokemon que seleccionamos
//       setInput({
//         ...input,
//         types: [...input.types.filter((t) => t !== type)], //te devuelve un nuevo array y elimina con el filter todos aquellos que no seleccionaste.
//         // SEGUIMOS ACA
//       });
//       setError(
//         validationPoke({
//           ...input,
//           types: [...input.types.filter((t) => t !== type)],
//         })
//       );
//     } else {
//       setInput({
//         ...input,
//         types: [...input.types, type],
//       });
//       setError({
//         ...input,
//         types: [...input.types, type],
//       });
//     }
//   };

//   const handleSubmit = async (ev) => {
//     ev.preventDefault();
//     if (!Object.entries(error).length) {
//       const response = await axios.post(
//         "http://localhost:3001/pokemons",
//         input
//       );
//       if (response.data.message === "Pokemon successfully created") {
//         navigate(`/details/${response.data.nuevoPokemon.id}`);
//       }
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} className={style.formCreate}>
//         <div>
//           <label>Nombre</label>
//           <input
//             onChange={handleChange}
//             value={input.name}
//             name="name"
//             className={style.inputCreate}
//           />
//           {error.name ? <label>{error.name}</label> : <label>&nbsp;</label>}
//         </div>
//         <div>
//           <label>Imagen URL</label>
//           <input
//             onChange={handleChange}
//             value={input.img}
//             name="img"
//             className={style.inputCreate}
//           />
//           {error.img ? <label>{error.img}</label> : <label>&nbsp;</label>}
//         </div>
//         <div>
//           <label>Vida</label>
//           <input
//             onChange={handleChange}
//             value={input.health}
//             type="number"
//             name="health"
//             className={style.inputCreate}
//           />
//           {error.health ? <label>{error.health}</label> : <label>&nbsp;</label>}
//         </div>
//         <div>
//           <label>Ataque</label>
//           <input
//             onChange={handleChange}
//             value={input.attack}
//             type="number"
//             name="attack"
//             className={style.inputCreate}
//           />
//           {error.attack ? <label>{error.attack}</label> : <label>&nbsp;</label>}
//         </div>
//         <div>
//           <label>Defensa</label>
//           <input
//             onChange={handleChange}
//             type="number"
//             value={input.defense}
//             name="defense"
//             className={style.inputCreate}
//           />
//           {error.defense ? (
//             <label>{error.defense}</label>
//           ) : (
//             <label>&nbsp;</label>
//           )}
//         </div>
//         <div>
//           <label>Velocidad</label>
//           <input
//             onChange={handleChange}
//             value={input.speed}
//             type="number"
//             name="speed"
//             className={style.inputCreate}
//           />
//           {error.speed ? <label>{error.speed}</label> : <label>&nbsp;</label>}
//         </div>
//         <div>
//           <label>Altura</label>
//           <input
//             onChange={handleChange}
//             value={input.height}
//             type="number"
//             name="height"
//             className={style.inputCreate}
//           />
//           {error.height ? <label>{error.height}</label> : <label>&nbsp;</label>}
//         </div>
//         <div>
//           <label>Peso</label>
//           <input
//             onChange={handleChange}
//             value={input.weight}
//             type="number"
//             name="weight"
//             className={style.inputCreate}
//           />
//           {error.weight ? <label>{error.weight}</label> : <label>&nbsp;</label>}
//         </div>
//         <div>
//           <label>Tipo:</label>
//           {error.types ? <label>{error.types}</label> : <label>&nbsp;</label>}

//           <div className={style.check}>
//             {types?.map((t) => {
//               return (
//                 <div key={t.name}>
//                   <label>{t.name}</label>
//                   <input
//                     onChange={handleChangeTypes}
//                     value={`${t.name}`}
//                     type="checkbox"
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//         <div>
//           <input
//             disabled={disabler || Object.entries(error).length ? true : false}
//             value="Crear"
//             type="submit"
//           />
//           <Link to={"/home"}>
//             <button>Home</button>
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreatePoke;
