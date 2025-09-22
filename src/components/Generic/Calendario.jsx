import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { obtenerTodasLasReservas } from "../../services/reservaService";

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const reservas = await obtenerTodasLasReservas();
        const calendarEvents = reservas
          .filter((reserva) => reserva.estado === "APROBADA")
          .map((reserva) => ({
            id: reserva.id,
            title: `${reserva.nombreEspacio} - ${reserva.nombreSolicitante}`,
            start: new Date(reserva.fechaHoraInicio),
            end: new Date(reserva.fechaHoraFin),
            allDay: false,
          }));
        setEvents(calendarEvents);
      } catch (error) {
        console.error("Error al obtener reservas para calendario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-3">
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Cargando calendario...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
        }}
      />
    </div>
  );
};

export default Calendario;
