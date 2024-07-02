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

      for (const key in item) {
        let newKey = key;

        // Reemplazo de '-Comment' con '_descripcion'
        if (key.includes('-Comment'))
          newKey = key.replace('-Comment', '_descripcion');

        // Tratar de manera especial los arrays que contienen un objeto con `content`
        if (Array.isArray(item[key])) {
          const arrayTemp = item[key].map((subItem: any) => {
            if (
              subItem.content &&
              subItem.type &&
              subItem.type.startsWith('image/')
            ) {
              return `${this.config.API_URL}/evidence/${subItem.content}`;
            } else {
              return ''; /** Sin Archivo */
            }
          });

          // Crear claves múltiples si hay más de un elemento en el array
          // for (let i = 0; i < 5; i++) { // Max 5
          for (let i = 0; i < Math.max(arrayTemp.length, 5); i++) {
            newItem[`${newKey.replace(/_/g, ' ')}${i + 1}`] =
              arrayTemp[i] || '' /** Sin Archivo */;
          }
        } else {
          // Reemplazar guiones bajos por espacios en las llaves
          newKey = newKey.replace(/_/g, ' ');
          newItem[newKey] = item[key];
        }
      }

      // Eliminar todas las llaves originales y reemplazar el objeto viejo por el nuevo
      Object.keys(item).forEach((key) => delete item[key]);
      Object.assign(item, newItem);
    });
    return jsonData;
  }
}
