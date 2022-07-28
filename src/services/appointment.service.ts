import {appointmentAPI} from "../api/appointments";

class AppointmentServiceType {
    public getAppointment() {
      return appointmentAPI
          .getAppointments()
    }

    public getScheduledAppointment(date: string) {
        return appointmentAPI
            .getScheduledAppointment(date)
    }
}

export const appointmentService = new AppointmentServiceType();