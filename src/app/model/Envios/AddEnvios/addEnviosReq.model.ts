import { FrecuenteReqModel } from "../../FrecuenteReqModel.model";
import { EnviosProductoModel } from "./EnvioProducto.model";
import { EnviosModel } from "./Envios";

export class AddEnviosReqModel{
    productos?: EnviosProductoModel[]
    data?: EnviosModel
    frecuente?: FrecuenteReqModel

    constructor(){
       
    }
   
}