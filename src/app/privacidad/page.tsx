import React from "react";
import Link from "next/link";

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-ivory pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="mb-12">
          <Link href="/" className="text-sm text-gold hover:underline mb-4 inline-block">
            ← Volver a inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif text-onyx mb-6">Políticas de Privacidad</h1>
          <p className="text-charcoal text-sm">Última actualización: Mayo 2026</p>
        </div>

        <div className="prose prose-lg prose-headings:font-serif prose-headings:text-onyx prose-p:text-charcoal prose-a:text-gold max-w-none">
          <p className="lead text-xl text-charcoal mb-8">
            En ALEAFAR Joyería, valoramos la privacidad de nuestros clientes tanto como la autenticidad de nuestras gemas. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos su información personal.
          </p>

          <h2 className="text-2xl mt-12 mb-4">1. Información que Recopilamos</h2>
          <p>Podemos recopilar información personal, incluyendo pero no limitado a:</p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li><strong>Información de Contacto:</strong> Nombre, dirección de correo electrónico, dirección de envío y facturación, y número de teléfono.</li>
            <li><strong>Información de Pago:</strong> Detalles de la tarjeta de crédito u otros datos de pago (procesados de forma segura a través de nuestros proveedores de pago).</li>
            <li><strong>Información de la Cuenta:</strong> Historial de compras, lista de deseos e información de perfil.</li>
            <li><strong>Datos de Navegación:</strong> Información sobre su dispositivo, dirección IP y cómo interactúa con nuestro sitio web.</li>
          </ul>

          <h2 className="text-2xl mt-12 mb-4">2. Uso de su Información</h2>
          <p>Utilizamos la información recopilada para:</p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>Procesar y cumplir sus pedidos, incluyendo la coordinación del envío y la entrega.</li>
            <li>Comunicarnos con usted sobre su pedido, cuenta o consultas de servicio al cliente.</li>
            <li>Proporcionar una experiencia personalizada y recomendar productos que puedan ser de su interés.</li>
            <li>Mejorar nuestra página web y ofertas de productos basadas en el análisis del comportamiento del cliente.</li>
            <li>Prevenir fraudes y asegurar la seguridad de nuestras transacciones.</li>
          </ul>

          <h2 className="text-2xl mt-12 mb-4">3. Protección de Datos</h2>
          <p>
            Empleamos tecnología de encriptación de nivel bancario (SSL) para proteger sus datos personales durante la transmisión. Solo el personal autorizado tiene acceso a la información personal para propósitos estrictamente laborales. Nunca vendemos ni alquilamos su información personal a terceros.
          </p>

          <h2 className="text-2xl mt-12 mb-4">4. Retención de Información</h2>
          <p>
            Conservaremos su información personal durante el tiempo que sea necesario para cumplir con los fines establecidos en esta Política de Privacidad, o según lo exija la ley. Una vez que su información no sea requerida, será eliminada de manera segura.
          </p>

          <h2 className="text-2xl mt-12 mb-4">5. Contacto</h2>
          <p>
            Si tiene alguna pregunta o inquietud sobre nuestra Política de Privacidad, por favor contáctenos a:
            <br />
            <strong>Email:</strong> privacidad@aleafar.cl
            <br />
            <strong>Teléfono:</strong> +56 9 1234 5678
          </p>
        </div>
      </div>
    </div>
  );
}
