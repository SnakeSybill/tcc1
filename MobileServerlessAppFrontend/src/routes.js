import login from "./screens/login.js";
import inicio from "./screens/inicio.js";
import welcome from "./screens/welcome.js";
import agenda from "./screens/agenda.js";
import eventos from "./screens/eventos.js";
import contatos from "./screens/contatos.js";
import cadastro from "./screens/cadastro.js";
import addevento from "./screens/addEvento.js";
import addcontato from "./screens/addContato.js";
import convites from "./screens/convites.js";
import viewconvite from "./screens/viewConvite.js";
import { createStackNavigator, createAppContainer } from "react-navigation";

const routes = createStackNavigator({
    login,
    addcontato,
    convites,
    viewconvite,
    inicio,
    eventos,
    contatos,
    cadastro,
    welcome,
    agenda,
    addevento,
});

export default createAppContainer(routes);