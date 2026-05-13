import React from "react";
import Link from "next/link";

export default function DevolucionesPage() {
  return (
    <div className="min-h-screen bg-ivory pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="mb-12">
          <Link href="/" className="text-sm text-gold hover:underline mb-4 inline-block">
            ← Volver a inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif text-onyx mb-6">Garantía y Devoluciones</h1>
          <p className="text-charcoal text-sm">Garantía de Excelencia ALEAFAR</p>
        </div>

        <div className="prose prose-lg prose-headings:font-serif prose-headings:text-onyx prose-p:text-charcoal prose-a:text-gold max-w-none">
          <p className="lead text-xl text-charcoal mb-8">
            En ALEAFAR Joyería, respaldamos la calidad y la artesanía excepcional de cada pieza que creamos. Nuestra política de garantía y devoluciones está diseñada para brindarle total tranquilidad en su inversión.
          </p>

          <h2 className="text-2xl mt-12 mb-4">1. Garantía de por Vida</h2>
          <p>
            Todas nuestras joyas de oro y platino están cubiertas por una <strong>Garantía Limitada de por Vida</strong> contra defectos de fabricación. Si su joya presenta algún defecto de fabricación, la repararemos o reemplazaremos sin costo alguno.
          </p>
          <p className="mt-4">
            Esta garantía no cubre el desgaste natural por el uso diario, daños accidentales (como golpes o caídas), pérdida de gemas o diamantes debida a daños en la montura, ni cualquier alteración o reparación realizada por joyeros externos a ALEAFAR.
          </p>

          <h2 className="text-2xl mt-12 mb-4">2. Política de Devoluciones y Cambios</h2>
          <p>
            Aceptamos devoluciones y cambios dentro de los <strong>30 días naturales</strong> siguientes a la fecha de entrega de su pedido, sujeto a las siguientes condiciones:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>La joya debe estar en su estado original, sin signos de uso, alteraciones o daños.</li>
            <li>Debe incluirse el estuche original de ALEAFAR, todos los certificados de gemas (si aplica) y la boleta o factura de compra.</li>
            <li>Las piezas personalizadas, grabadas, o hechas a medida (Bespoke) no son elegibles para devolución o cambio, a menos que presenten un defecto de fabricación.</li>
          </ul>

          <h2 className="text-2xl mt-12 mb-4">3. Proceso de Devolución</h2>
          <p>Para iniciar una devolución o cambio, por favor siga estos pasos:</p>
          <ol className="list-decimal pl-6 space-y-2 mb-8">
            <li>Contacte a nuestro equipo de Atención al Cliente a través del correo <strong>devoluciones@aleafar.cl</strong> o mediante WhatsApp indicando su número de pedido.</li>
            <li>Nuestro equipo le proporcionará una etiqueta de envío asegurado e instrucciones detalladas para el embalaje.</li>
            <li>Una vez recibida y evaluada la joya por nuestros maestros joyeros (proceso que toma de 2 a 3 días hábiles), procesaremos su reembolso o cambio.</li>
          </ol>
          <p>
            Los reembolsos se emitirán utilizando el mismo método de pago utilizado en la compra original. Tenga en cuenta que el abono puede tardar hasta 10 días hábiles en reflejarse en su cuenta, dependiendo de su entidad bancaria.
          </p>

          <h2 className="text-2xl mt-12 mb-4">4. Mantenimiento y Cuidado</h2>
          <p>
            Como cliente de ALEAFAR, usted tiene derecho a una limpieza profesional y revisión de engastes gratuita una vez al año por cada joya adquirida en nuestra tienda.
          </p>
        </div>
      </div>
    </div>
  );
}
