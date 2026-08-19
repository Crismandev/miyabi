import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../section-header.component';
import { AnchorNavComponent, AnchorItem } from '../anchor-nav.component';
import { CardComponent, CardData } from '../cards.component';
import { SpaReserveComponent } from './spa-reserve.component';

@Component({
  selector: 'app-spa',
  standalone: true,
  imports: [
    CommonModule,
    SectionHeaderComponent,
    AnchorNavComponent,
    CardComponent,
    SpaReserveComponent,
  ],
  template: `
    <main
      id="main"
      data-page="rooms"
      class="relative block w-full pt-[65px] pr-[65px] pb-0 pl-[150px] text-black tracking-[1px] box-inherit"
    >
      <app-anchor-nav [items]="anchorList"></app-anchor-nav>

      <app-section-header
        sideImageJp="https://mukayu.com/wp-content/themes/corporate/img/spa_jp.svg"
        headerTitle="Spa Entei"
        conceptText=""
      ></app-section-header>

      <app-card *ngFor="let item of spaData" [data]="item"> </app-card>

      <app-spa-reserve></app-spa-reserve>
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class SpaComponent {
  anchorList: AnchorItem[] = [
    { id: 'hotspring', label: 'Baños termales' },
    { id: 'spa-entei', label: 'Yakushiyama y Spa Entei' },
    { id: 'medicinal-herbs', label: 'Hierbas medicinales' },
    { id: 'menu-yakushiyama', label: 'Menú | Tratamiento Yakushiyama' },
    { id: 'menu-others', label: 'Menú | Otros' },
    { id: 'menu-optional', label: 'Menú | Menú Opcional' },
  ];

  spaData: CardData[] = [
    {
      id: 'hotspring',
      title: 'Baños termales',
      description:
        'Calidad del agua: Manantial de sulfato con calcio y sodio.El componente principal es el ion sulfito, y contiene mucho calcio y sodio como minerales.Se aconseja a huéspedes empezar tratamientos tras sumergirse en agua termal para promover la circulación sanguínea y linfática y mejorar los efectos.El agua termal tiene los siguientes efectos:“Efecto térmico”: al calentarse el cuerpo, los capilares cerca de la superficie cutánea se dilatan, lo que promueve la circulación sanguínea y linfática. Esta mejora aumenta la actividad metabólica y elimina desechos internos y fatiga del cuerpo.“Efecto de presión del agua”: la presión estrecha los vasos sanguíneos, estimula el flujo desde los pies hacia arriba e impulsa la circulación. También comprime el diafragma y pulmones, aumentando la respiración para obtener más aire, mejorando la función cardiopulmonar.“Efecto de flotación”: la flotación al bañarse reduce la carga en músculos y articulaciones, liberando tensión muscular y brindando una relajación profunda.“Efecto farmacológico”: el sodio y el calcio son conocidos por sus efectos sedantes y su capacidad para aliviar dolores de lesiones, articulaciones, músculos y gota. Los iones de sulfato expanden los vasos sanguíneos y mejoran el flujo, siendo eficaces para presión alta, arteriosclerosis e infarto cerebral. El calcio se adhiere finamente a la superficie cutánea, reparando y humectando la piel. El sodio aporta humedad e hidrata. El agua ayuda a crear una piel hermosa al prevenir la sequedad y mejorar su elasticidad y firmeza.',
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/spa/spa_img_01.jpg',
      ],
      isSmallText: true,
    },
    {
      id: 'spa-entei',
      title: 'Yakushiyama y Spa Entei',
      description:
        'El manantial termal de Yamashiro se ha desarrollado en estrecha relación con el “Hakusan (Montaña Blanca)”, una montaña sagrada local. En el período Heian (hace unos 1,000 años), se completaron los cinco templos de Hakusan, los cuales pasaron a cumplir un rol central en las creencias populares hacia Hakusan. El templo Yakuoin Onsenji en Yamashiro prosperó como el templo principal de estos cinco. La zona alrededor de Yakuoin Onsenji solía llamarse “Yakushiyama (Montaña del Buda de la Curación)” por su alta espiritualidad; era un lugar de entrenamiento para monjes budistas y, al mismo tiempo, un sitio de sanación donde los monjes curaban a las personas ofreciendo baños termales y preparando hierbas medicinales. Beniya Miyabi es un hotel termal situado tranquilamente en una colina de esta sagrada Yakushiyama, donde antes se ubicaba el salón principal de Yakuoin Onsenji. En nuestro “Spa Entei” ofrecemos el “Tratamiento Yakushiyama” y otras terapias para el cuidado físico y mental usando agua termal y hierbas medicinales, heredando el espíritu de los remedios tradicionales de los monjes locales.',
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/spa/spa_img_02.jpg',
      ],
      isSmallText: true,
    },
    {
      id: 'medicinal-herbs',
      title: 'Matriz de hierbas medicinales Ho, Sha, Ryu, Cho',
      description: '',
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/spa/spa_img_03_en.svg',
      ],
      isSmallText: true,
      isTallImage: true,
    },
    {
      id: 'menu-yakushiyama',
      title: 'Menú | Tratamiento Yakushiyama',
      description:
        'Nuestro exclusivo “Tratamiento Yakushiyama” es un servicio de cuidado físico y mental que utiliza agua termal y hierbas medicinales. Es la aplicación moderna del espíritu de los remedios herbales tradicionales y las termas de Yakushiyama ofrecidos por monjes locales. Realizamos un asesoramiento basado en el principio de la matriz de hierbas medicinales, “Ho, Sha, Ryu, Cho”, y preparamos una “bola de hierbas medicinales” y una “crema herbal” personalizadas según la condición física y constitución de cada huésped.',
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/spa/spa_img_04.jpg',
      ],
      menuDetails: [
        {
          title: 'Tratamiento Corporal Yakushiyama',
          pricingHtml: `Tratamiento Corporal Yakushiyama<br>◎ Corporal (solo espalda), hombros, cabeza, bola de hierbas<br>70 min.: ¥30,800<br>◎ Cuerpo completo, hombros, cabeza, bola de hierbas<br>90 min.: ¥34,100<br>◎ Cuerpo completo, hombros, cabeza, bola de hierbas<br>120 min.: ¥40,700`,
          accordionText: `Primero aplicamos una “crema herbal medicinal” seleccionada según tu tipo físico y realizamos un masaje para estimular los meridianos y activar tu cuerpo. <br>Luego, se aplicarán como compresas calientes “esferas herbales medicinales” impregnadas con el vapor del agua de las termas de Yamashiro, presionándolas suavemente contra el cuerpo. La “esfera herbal medicinal” y el “masaje con crema herbal medicinal” permitirán una profunda penetración de los componentes medicinales de las hierbas en tu cuerpo, lo que mejorará tu bienestar. Después del tratamiento, disfrutarás de un baño de pies en aguas termales con componentes de hierbas medicinales.<br>*Crema herbal: Mezcla de la infusión de hierbas medicinales tradicionales, aceite seleccionado con base en el principio “Ho, Sha, Ryu, Cho”, y una crema especial que contiene 24 tipos de hierbas.`,
        },
        {
          title: 'Tratamiento Facial Yakushiyama',
          pricingHtml: `◎ Hombros, facial, cabeza, esfera herbal<br>70 min.: ¥36,300<br>◎ Espalda, hombros, facial, cabeza, esfera herbal<br>90 min.: ¥39,600`,
          accordionText: `Este tratamiento es un cuidado facial premium que utiliza los productos de "Yakushiyama Amenity".<br>Después de usar el limpiador "Yakushiyama Facial wash", se aplica un gommage herbal, suavizado con agua termal, para eliminar las impurezas de la piel y permitir que absorba eficazmente los componentes medicinales. Tras un masaje reafirmante con la emulsión "Yakushiyama Emulsion", se presionará suavemente una "bola de hierbas medicinales" al vapor alrededor de su cuello y hombros. Esto estimula los meridianos que recorren el rostro, el cuello y los hombros, y redefine la línea facial.<br>El tratamiento se completará con la mascarilla de "Yakushiyama AA Undiluted Fermented Placenta", la loción "Yakushiyama Lotion" y la emulsión "Yakushiyama Emulsion". Los elementos activos de los ingredientes ayudan a rejuvenecer la piel.`,
        },
        {
          title: 'Combinaciones de Tratamiento Facial y Corporal Yakushiyama',
          pricingHtml: `◎ Cuerpo (solo espalda), facial, cabeza, esfera herbal<br>120 min.: ¥44,000<br>◎ Cuerpo completo, facial, cabeza, esfera herbal<br>140 min.: ¥47,300`,
          accordionText: `Una combinación del tratamiento corporal Yakushiyama y el tratamiento facial Yakushiyama.".<br>Al disponer de un tiempo prolongado, este tratamiento alivia la tensión de todo el cuerpo, equilibra el sistema nervioso autónomo y conduce a una relajación más profunda.`,
        },
      ],
    },
    {
      id: 'menu-others',
      title: 'Menú | Otros',
      description: '',
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/spa/spa_img_05.jpg',
      ],
      menuDetails: [
        {
          title:
            '【Oferta de temporada】 Tratamiento corporal de primavera con sakura',
          pricingHtml: `• Disponible solo en marzo y abril.<br>◎ Cuerpo completo, hombros, masaje de cabeza<br>70 min.: ¥29,700<br>◎ Cuerpo completo, hombros, masaje de cabeza<br>90 min.: ¥33,000`,
          accordionText: `Tratamiento corporal de primavera con sakura<br>Tratamiento corporal aromático inspirado en la "sakura" (flor de cerezo), la flor típica de Japón.<br>Se dice que el aroma refrescante y elegante de las flores de cerezo tiene un efecto relajante.<br>El aceite base está elaborado con aceite de salvado de arroz prensado en frío producido en la prefectura de Ishikawa, enriquecido con extracto de flor de cerezo. El componente principal es el ácido oleico, que repara suavemente la piel dañada por los rayos ultravioleta y la sequedad.<br>*El extracto de sakura alivia la piel seca y la picazón, y nutre la piel mejorando la protección natural contra los rayos ultravioleta.<br>*Masaje de cabeza con almohadilla para ojos de piedra IOU.<br>*Incluye un baño de pies con flores de cerezo.`,
        },
        {
          title:
            '【Oferta de Temporada】 Tratamiento para el Alivio del Calor de Verano',
          pricingHtml: `• Disponible de mayo a agosto.<br>◎ Cuerpo (solo espalda), hombros, masaje de cabeza*<br>50 min.: ¥26,400<br>◎ Cuerpo completo, hombros, masaje de cabeza*<br>70 min.: ¥29,700<br>◎ Cuerpo completo, hombros, masaje de cabeza*<br>90 min.: ¥33,000`,
          accordionText: `El Tratamiento de Alivio del Calor Estival está diseñado específicamente para combatir el calor y la fatiga causados por el fuerte sol del verano y el agotamiento del viaje. Utilizamos una mezcla original de aceites esenciales que contiene menta (hakka) cultivada en el rico entorno natural de Noto, combinada con shiso y limoncillo, junto con aceite de salvado de arroz. Con un aroma refrescante y un suave masaje, enfría delicadamente el cuerpo que acumula calor. La sensación vigorizante del mentol promueve un profundo frescor para la mente y el cuerpo, regulando los malestares del verano.<br><br>*El masaje de cabeza carbonatado incluye: refrescar y tensar el cuero cabelludo con un refrescante masaje de cabeza con ácido carbónico. También puede esperar un efecto de estiramiento facial.<br>*Incluye un baño de pies con agua de manantial y agua de Hiba de Noto.`,
        },
        {
          title:
            '【Oferta de Temporada】 Recuperación Post-Solar de Rosa de Damasco (Corporal y Facial)',
          pricingHtml: `• Disponible de mayo a agosto.<br>◎ Cuerpo completo, facial exprés, hombros, masaje de cabeza*<br>100 min.: ¥44,000`,
          accordionText: `Este es un curso de cuidado total que se enfoca intensamente en el rostro y el cuerpo expuestos a los fuertes rayos UV del verano. Es un tratamiento corporal y facial que utiliza aceite de rosa de Damasco para calmar suavemente la delicada piel después de la exposición al sol. Se utiliza una mascarilla de agua de rosas en el rostro para calmar ligeramente el calor, reponiendo la frescura de la hidratación. El toque final es una lujosa aplicación de sérum de aceite orgánico hecho de rosas de Damasco cultivadas en la prefectura de Ishikawa. El rico aroma y los ingredientes de belleza nutren profundamente la piel de verano, guiándola hacia una tez radiante y suave.<br><br>*El masaje de cabeza carbonatado incluye: refrescar y tensar el cuero cabelludo con un refrescante masaje de cabeza con ácido carbónico. También puede esperar un efecto de estiramiento facial.<br>*Incluye un baño de pies con agua de manantial y agua de Hiba de Noto.`,
        },
        {
          title:
            '【Oferta de Temporada】 Tratamiento Corporal de Yuzu de Invierno',
          pricingHtml: `• Disponible de septiembre a noviembre.<br>◎ Cuerpo completo, hombros, masaje de cabeza*<br>70 min.: ¥29,700<br>◎ Cuerpo completo, hombros, masaje de cabeza*<br>90 min.: ¥33,000`,
          accordionText: `Nuestro Tratamiento Especial de Otoño utiliza *osmanto, conocido por su dulce aroma y efecto de relajación.<br>En combinación con aceite de salvado de arroz de producción local, ayuda a suavizar e hidratar la piel.<br>Este tratamiento es particularmente bueno para la piel seca y dañada, mejora la protección natural contra los rayos ultravioleta y ayuda a rejuvenecer suavemente el cuerpo.<br>*Osmanto (=Olivo fragante)<br><br>*Masaje de cabeza con almohadilla para ojos de piedra IOU.<br>*Incluye un baño de pies con osmanto.
`,
        },
        {
          title:
            '【Oferta de Temporada】 Tratamiento Corporal de Yuzu de Invierno',
          pricingHtml: `• Disponible de diciembre a febrero.<br>◎ Cuerpo completo, masaje de cabeza*<br>70 min.: ¥29,700<br>◎ Cuerpo completo, masaje de cabeza*<br>90 min.: ¥33,000`,
          accordionText: `Nuestros terapeutas aplican un aceite esencial aromático japonés especial: yuzu (cítrico) mezclado con aceite de sésamo, conocido en Japón como el 'aceite secreto para la juventud eterna'. Este aceite contiene sustancias altamente antioxidantes y calienta el cuerpo y la mente con aromas agradables.<br>Le aceite de sésamo extra virgen contiene ingredientes activos como sesamina, sesamolina y vitaminas, excelentes para rejuvenecer, hidratar y desintoxicar.<br>Todos los tratamientos finalizan con una bebida infundida con yuzu y miel.<br>(Durante el tratamiento se colocará una almohada especial rellena de piedras calientes del sagrado monte IOU).<br><br>*Masaje de cabeza con almohadilla para ojos de piedra IOU.<br>*Incluye un baño de pies con yuzu.`,
        },
        {
          title: 'Tratamiento de Recuperación del Jet Lag',
          pricingHtml: `◎ Cuerpo (espalda, piernas), abdomen, hombros, masaje de cabeza<br>70 min.: ¥29,700<br>◎ Cuerpo completo, abdomen, hombros, masaje de cabeza<br>90 min.: ¥33,000`,
          accordionText: `Este tratamiento se enfoca en aliviar los malestares físicos y mentales causados por el jet lag, regulando el sistema nervioso autónomo y ajustando el reloj biológico alterado del cuerpo.<br>Los aceites esenciales de limoncillo y menta ayudan a aliviar la fatiga, los trastornos gastrointestinales y los cambios repentinos en el entorno, haciéndote sentir renovado.<br><br>*Tratamiento para el abdomen – Este tratamiento activa los intestinos al enfocarse en los puntos de acupuntura y la circulación linfática. Es eficaz para problemas como la debilidad digestiva, el estrés y el jet lag.`,
        },
        {
          title: 'Tratamiento Corporal de Terapia Muscular',
          pricingHtml: `◎ Cuerpo (solo espalda), hombros, cabeza<br>70 min.: ¥28,600<br>◎ Cuerpo completo, hombros, cabeza<br>90 min.: ¥30,800<br>◎ Cuerpo completo, hombros, cabeza<br>120 min.: ¥35,200`,
          accordionText: `Este tratamiento es una combinación de masaje con aceites esenciales y estiramiento corporal para la recuperación de la fatiga muscular. Se utilizan aceites esenciales eficaces para la relajación muscular, la circulación sanguínea y la degradación del ácido láctico. <br>El tratamiento es eficaz para todo el cuerpo, especialmente para la fatiga de cuello, hombros, espalda y piernas.`,
        },
        {
          title: 'Tratamiento Corporal de Aromaterapia',
          pricingHtml: `◎ Cuerpo (solo espalda), hombros, cabeza<br>50 min.: ¥25,300<br>◎ Cuerpo completo, cabeza<br>70 min.: ¥27,500`,
          accordionText: `La aromaterapia es un tratamiento que utiliza aceites esenciales extraídos de plantas, basado en el estudio de la medicina herbal. Los aceites esenciales altamente aromáticos facilitan la respiración, mientras que el ritmo pausado, el tacto fluido y la presión suave del masaje te llevarán a un estado más profundo de relajación.<br>Utilizamos la mezcla original de aceites esenciales 100% puros de Miyabi, extraídos de plantas orgánicas y especies silvestres.`,
        },
        {
          title: 'Masaje japonés de puntos de presión',
          pricingHtml: `◎ Cuerpo completo, cabeza<br>50 min.: ¥22,000<br>◎ Cuerpo completo, cabeza<br>70 min.: ¥25,300`,
          accordionText: `Este es un masaje de puntos de presión sin ningún tipo de aceites, que elimina la rigidez de todo el cuerpo, enfocándose especialmente en el cuello, los hombros y la espalda.<br>Se aplica lentamente a lo largo de los meridianos para eliminar la fatiga.<br>*Se solicita a los huéspedes cambiarse a nuestra vestimenta de tratamiento.`,
        },
        {
          title: 'Tratamiento de Embarazo Yakushiyama',
          pricingHtml: `◎ Cuerpo (solo espalda), hombros, cabeza, esfera herbal<br>70 min.: ¥31,900<br>◎ Cuerpo (solo espalda), facial, cabeza, esfera herbal<br>90 min.: ¥40,700`,
          accordionText: `Este tratamiento está orientado a abordar problemas como la rigidez de hombros, el dolor de espalda, la sensación de frío y la hinchazón de piernas, que suelen ocurrir durante el embarazo.<br>El tratamiento se realiza en una posición que evita la presión sobre la zona abdominal.<br><br>*Le recomendamos programar este tratamiento antes de la cena.`,
        },
      ],
    },
    {
      id: 'menu-optional',
      title: 'Menú | Menú Opcional',
      description:
        'Las siguientes opciones se pueden combinar con cualquier otro tratamiento del menú.',
      images: [
        'https://mukayu.com/wp-content/themes/corporate/img/spa/spa_img_06.jpg',
      ],
      menuDetails: [
        {
          title: 'Tratamiento Corporal Yakushiyama',
          pricingHtml: `Tratamiento para el abdomen<br>20 min.: ¥5,500<br>Este es eficaz cuando se combina con un tratamiento corporal. Este tratamiento activa los intestinos al enfocarse en los puntos de acupuntura y la circulación linfática.<br>Es eficaz para problemas como la debilidad digestiva, el estrés y el jet lag.<br>*Le recomendamos programar este tratamiento antes de la cena.`,
          accordionText: ``,
        },
        {
          title: 'Masaje de cabeza con almohadilla para ojos de piedra IOU',
          pricingHtml: `20 min.: ¥5,500<br>Este masaje de cuero cabelludo nutre tu cuero cabelludo y cabello mediante el uso de una “crema herbal medicinal”. Estimula la circulación sanguínea en el cuero cabelludo y elimina la fatiga de la cabeza, el cuello y los ojos. Durante el masaje se utiliza una almohadilla para ojos de piedra IOU* para mantener tus ojos calientes. Es eficaz para la fatiga ocular y el insomnio.<br>*La piedra IOU se extrae de un mineral natural en el monte Iou, Kanazawa, prefectura de Ishikawa. Es rica en minerales de alta calidad. Los rayos infrarrojos lejanos generados por la piedra calientan los ojos desde lo profundo y los iones negativos alivian la tensión.`,
          accordionText: ``,
        },
        {
          title: 'Masaje de reflexología podal',
          pricingHtml: `20 min.: ¥5,500<br>La reflexología es una terapia que vitaliza varias partes del cuerpo al aplicar una presión suave en los puntos reflejos de las plantas de los pies. Ayuda a la recuperación de trastornos al abordar la parte afectada del cuerpo.`,
          accordionText: ``,
        },
        {
          title: 'Tratamiento Facial Express',
          pricingHtml: `30 min.: ¥13,200<br>Este tratamiento comienza con una limpieza utilizando el “Limpiador facial Yakushiyama”, continúa con un masaje facial relajante y concluye con la aplicación de la “Loción Yakushiyama” y la “Emulsión Yakushiyama” para nutrir e hidratar la piel.`,
          accordionText: ``,
        },
      ],
    },
  ];
}
