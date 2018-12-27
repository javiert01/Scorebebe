import { Usuario } from "../usuario/usuario.model";

export class Neonato {

    public nombreApellido: string;
  
    public  fechaCalculo: string;

    public fechaNacimiento: string;

    public sexo: string;

    public edadGestional: number;

    public peso: number;

    public factorRiesgoInminente: boolean;

    public factorRiesgoAumenta: boolean;

    public factorRiesgoReduce: boolean;

    public nivelAtencion: string;
  
    public  catEdadGestional: number;
  
    public  catPeso: number;
  
    public  catPesoEdadGestional: number; 
  
    public  catApgar: number;
  
    public  catTipoParto: number;
  
    public  catComorbilidades: number;
  
    public  scoreTotal: number;
  
    public  catRiesgo: string;
  
    public  ID_USUARIO: number;

}