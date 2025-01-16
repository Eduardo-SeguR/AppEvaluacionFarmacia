import React from "react";
import { Button } from "@nextui-org/react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      {/* Hero Section */}
      <section
  className="relative w-screen h-[70vh] flex items-center justify-start bg-cover bg-center"
  style={{
    backgroundImage:
      'url("https://www.pkf.com.au/uploads/Insights/Health-AdobeStock_527209943-Pharmacy-60-day-dispensing.jpg")',
  }}
>
  <div className="absolute inset-0 bg-black/50" />
  <div className="relative z-10 px-6 w-full max-w-[1200px] mx-auto">
    <div className="max-w-lg">
      <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
        Simplifica la gestión de tu farmacia
      </h1>
      <p className="text-lg text-white/90 mb-6">
        Registra, gestiona y haz seguimiento de tus solicitudes y evaluaciones con facilidad.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          as={Link}
          to="/register"
          color="primary"
          size="lg"
          radius="full"
          className="bg-white text-blue-600 hover:bg-blue-100 transition-colors"
        >
          Crear una Cuenta
          <ArrowRight className="ml-2" />
        </Button>
        <Button
          as={Link}
          to="/login"
          color="secondary"
          size="lg"
          radius="full"
          variant="bordered"
          className="border-white text-white hover:bg-white hover:text-blue-600 transition-colors"
        >
          Iniciar sesión
        </Button>
      </div>
    </div>
  </div>
</section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            ¿Qué puedes hacer con nuestra plataforma?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Registro de Farmacias",
                description: "Facilita el registro de farmacias y documentación.",
                icon: "📋",
              },
              {
                title: "Seguimiento de Solicitudes",
                description: "Consulta el estado de tus solicitudes en tiempo real.",
                icon: "🔍",
              },
              {
                title: "Evaluaciones Rápidas",
                description: "Acceso eficiente a los resultados de evaluaciones.",
                icon: "📊",
              },
              {
                title: "Gestión Centralizada",
                description: "Administra todo desde un panel fácil de usar.",
                icon: "🖥️",
              },
              {
                title: "Notificaciones Inteligentes",
                description:
                  "Recibe alertas sobre cambios en tus solicitudes o evaluaciones.",
                icon: "🔔",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="shadow-md hover:shadow-lg transition-shadow"
              >
                <CardHeader className="flex gap-3">
                  <div className="text-3xl">{feature.icon}</div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-600">{feature.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Opinions Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Lo que dicen nuestros usuarios
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Ana López",
                feedback:
                  "La plataforma simplificó enormemente la gestión de mi farmacia. ¡Altamente recomendada!",
                avatar: "/placeholder.svg?height=60&width=60",
              },
              {
                name: "Carlos Pérez",
                feedback:
                  "Ahora puedo seguir mis evaluaciones y solicitudes sin problemas desde un solo lugar.",
                avatar: "/placeholder.svg?height=60&width=60",
              },
              {
                name: "María Rodríguez",
                feedback:
                  "La interfaz es intuitiva y me ahorra mucho tiempo. Un excelente recurso para propietarios de farmacias.",
                avatar: "/placeholder.svg?height=60&width=60",
              },
            ].map((opinion, index) => (
              <Card
                key={index}
                className="shadow-md hover:shadow-lg transition-shadow"
              >
                <CardHeader className="flex items-center gap-4">
                  <img
                    src={opinion.avatar || "/placeholder.svg"}
                    alt={opinion.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <h3 className="text-lg font-bold">{opinion.name}</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-600 italic">"{opinion.feedback}"</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
