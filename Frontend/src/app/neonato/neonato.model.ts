import { Usuario } from "../usuario/usuario.model";

export class Neonato {

    public nombreApellido: string;
  
    public  fechaCalculo: string;

    public horaNacimiento: string;

    public fechaNacimiento: string;

    public sexo: string;

    public edadGestional: number;

    public peso: number;

    public nivelAtencion: string;
  
    public  catEdadGestional: number;
  
    public  catPeso: number;
  
    public  catPesoEdadGestional: number; 
  
    public  catApgar: number;
  
    public  catTipoParto: number;
  
    public  comorbilidades: number[];

    public  factoresRiesgoAumenta: number[];

    public  factoresRiesgoInminente: number[];

    public  factoresRiesgoReduce: number[];
  
    public  scoreTotal: number;
  
    public  catRiesgo: string;
  
    public  ID_USUARIO: number;

}