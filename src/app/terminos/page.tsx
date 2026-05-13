import React from "react";
import Link from "next/link";

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-ivory pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="mb-12">
          <Link href="/" className="text-sm text-gold hover:underline mb-4 inline-block">
            ← Volver a inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif text-onyx mb-6">Términos y Condiciones</h1>
          <p className="text-charcoal text-sm">Última actualización: Mayo 2026</p>
        </div>

        <div className="prose prose-lg prose-headings:font-serif prose-headings:text-onyx prose-p:text-charcoal prose-a:text-gold max-w-none">
          <p className="lead text-xl text-charcoal mb-8">
            Bienvenido a ALEAFAR Joyería. Al utilizar nuestro sitio web y adquirir nuestros productos, usted acepta los siguientes Términos y Condiciones de uso y venta.
          </p>

          <h2 className="text-2xl mt-12 mb-4">1. Autenticidad de los Productos</h2>
          <p>
            Garantizamos que todas las piezas comercializadas por ALEAFAR Joyería están elaboradas con los materiales declarados. Todas nuestras gemas preciosas (diamantes, zafiros, esmeraldas, rubíes) sobre 0.50ct van acompañadas de su respectivo certificado de autenticidad (GIA o laboratorio independiente reconocido).
          </p>

          <h2 className="text-2xl mt-12 mb-4">2. Precios y Pagos</h2>
          <p>
            Todos los precios mostrados en el sitio web están en Pesos Chilenos (CLP) e incluyen el Impuesto al Valor Agregado (IVA). Nos reservamos el derecho de modificar los precios en cualquier momento sin previo aviso, sin embargo, los cambios no afectarán a los pedidos que ya hayan sido confirmados.
          </p>

          <h2 className="text-2xl mt-12 mb-4">3. Envíos y Entregas</h2>
          <p>
            Realizamos envíos a todo Chile a través de servicios de mensajería especializados en transporte de valores. El tiempo estimado de entrega se indicará en el proceso de compra. Los pedidos de piezas personalizadas o hechas a medida tienen un tiempo de producción adicional de 15 a 20 días hábiles.
          </p>

          <h2 className="text-2xl mt-12 mb-4">4. Propiedad Intelectual</h2>
          <p>
            Todo el contenido de este sitio web, incluyendo diseños de joyas, fotografías, textos, gráficos, logotipos e iconos de botones, es propiedad exclusiva de ALEAFAR Joyería y está protegido por las leyes de propiedad intelectual chilenas e internacionales. No está permitido reproducir, duplicar, copiar o explotar nuestro contenido sin nuestro permiso expreso por escrito.
          </p>

          <h2 className="text-2xl mt-12 mb-4">5. Modificaciones de los Términos</h2>
          <p>
            Nos reservamos el derecho de actualizar, modificar o reemplazar cualquier parte de estos Términos y Condiciones mediante la publicación de las actualizaciones en nuestro sitio web. Es su responsabilidad revisar periódicamente nuestro sitio web para ver los cambios.
          </p>

          <h2 className="text-2xl mt-12 mb-4">6. Ley Aplicable</h2>
          <p>
            Estos Términos y Condiciones y cualquier acuerdo separado por el cual le proporcionemos servicios se regirán e interpretarán de acuerdo con las leyes de la República de Chile.
          </p>
        </div>
      </div>
    </div>
  );
}
