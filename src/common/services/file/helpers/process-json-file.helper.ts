import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import configuration from 'src/common/config/configuration';

export interface IJsonProcessor {
  /**
   * Procesa los datos JSON para ajustarlos a los requisitos específicos del reporte,
   * modificando llaves, manejando valores de arrays y preparando los datos para su exportación.
   *
   * La función realiza los siguientes cambios:
   * 1. Transforma las llaves que contienen '-Comment' (formato de SurveyJS) a '_descripcion'.
   * 2. Convierte los valores de arrays en una cadena de texto separada por comas, manejando URLs específicas.
   * 3. Reemplaza todos los guiones bajos en las llaves por espacios para mejorar la legibilidad en el reporte.
   *
   * @param {any[]} jsonData - Un array de objetos JSON que contiene los datos a procesar.
   *    Cada objeto puede tener cualquier estructura, con potenciales llaves que incluyan arrays y strings que necesiten transformación.
   *
   * @returns {any[]} El array de JSON modificado, donde cada objeto ha sido ajustado según las reglas descritas.
   *    Se garantiza que las llaves modificadas y los valores de los arrays son tratados conforme a los requisitos.
   *
   * @remarks
   * * Esta función debe ser utilizada solo cuando se necesite preparar datos para la generación de reportes,
   * especialmente en casos donde la estructura de entrada es conocida y se requiere un formato específico de salida.
   * * Esta función esta adaptada para formatos json de respuesta de encuestas de SurveyJS
   */
  processAndConvert(jsonData: any): any;
}

@Injectable()
export class JsonProcessorService implements IJsonProcessor {
  constructor(
    @Inject(configuration.KEY) private config: ConfigType<typeof configuration>,
  ) {}

  public processAndConvert(jsonData: any) {
    jsonData.forEach((item: any) => {
      const newItem: { [key: string]: any } = {}; // Objeto para acumular los datos procesados

      for (let key in item) {
        let newKey = key;

        // if (key.includes('-Comment'))
        //   newKey = key.replace('-Comment', '_descripcion'); // Reemplazar '-Comment'

        // Procesar arrays y transformar su contenido si es necesario
        if (Array.isArray(item[key])) {
          item[key] = item[key]
            .map((subItem: any) =>
              subItem.content ? subItem.content : 'Sin Archivo',
            )
            .join(', ');
        }

        newKey = newKey.replace(/_/g, ' '); // Reemplazar guiones bajos por espacios en las llaves
        newItem[newKey] = item[key]; // Asignar el valor procesado a la nueva llave en newItem
      }

      Object.keys(item).forEach((key) => delete item[key]); // Eliminar todas las llaves originales
      Object.assign(item, newItem); // Reemplazar el objeto viejo por el nuevo
    });

    return jsonData;
  }
}
