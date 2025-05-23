const Agenda = require("../models/agenda");

async function createActivity(req, res) {

  
    const {
      user_id,
      time,
      day,
      month,
      year,
      description
    } = req.body;
  
    if ( !user_id || !time || !day || !month || !year || !description) return res.status(400).send({ message: "Todos los campos son necesarios" });
  
    const agenda = new Agenda({
      user_id,
      time,
      day,
      month,
      year,
      description
    });
  
    try {
    
    await agenda.save((error, userStorage) => {
      if (error) {
        res.status(500).send({ error:"ErrorSaving", message: "Error de la base de datos creando el usuario." });
        console.log(error);
      } else {
        res.status(200).send({ message: "Actividad guardada correctamente. ", userStorage} );
      }
    });
  } catch (error) {
    console.error("Error in creating user: ", error);
    res.status(500).send({  error:"InternalServerError", message: "Error interno del servidor, intenta más tarde." });
  }
  
  }

  async function deleteActivity(req, res) {
    const { _id } = req.params;
  
    try {
      const deleteActivity = await Agenda.findOneAndDelete({ _id });
  
      if (!deleteActivity) {
        res.status(500).send({ message: "Error al eliminar la actividad, fallo del servidor." });
      } else {
        res.status(200).send({ message: "Actividad eliminada correctamente." });
      }
    } catch (error) {
      console.error("Error deleting the activity:", error);
      res.status(500).send({  error:"InternalServerError", message: "Error interno del servidor, intenta más tarde." });
    }
  }

  async function updateActivity(req, res) {
    const {
      _id,
      time,
      description
    } = req.body;
  
    try {
      const activityUpdate = await Agenda.findOneAndUpdate(
        { _id },
        {
          $set: {
            time,
            description
          },
        },
        { new: true }
      );
  
      if (!activityUpdate) {
        res.status(500).send({ message: "Error al actualizar la actividad, fallo en el servidor." });
      } else {
        res.status(200).send({ message: "La actividad se actualizó correctamente."});
      }
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).send({  error:"InternalServerError", message: "Error interno del servidor, intenta más tarde." });
    }
  }

  async function getActivityByDay(req, res) {
    const { user_id, day, month, year } = req.query;
    if(!user_id || !day || !month || !year) return res.status(400).send({ message: "Todos los campos son requeridos." });

    try {

    const filter = {
      user_id,
      day,
      month,
      year
    };

    const activities = await Agenda.find(filter);

    if (activities.length === 0) {
      return res.status(200).send(null)
    }

    res.status(200).send(activities);
  
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).send({  error:"InternalServerError", message: "Error interno del servidor, intenta más tarde." });
    }
  }

  async function getActivityByMonth(req, res) {
    const {user_id, month, year} = req.query;
    if(!user_id || !month || !year) return res.status(400).send({ message: "Todos los campos son requeridos." });

    try {

    const filter = {
      user_id,
      month,
      year
    };

    const activities = await Agenda.find(filter);

    if (activities.length === 0) {
      return res.status(200).send([])
    }

    res.status(200).send(activities);
  
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).send({  error:"InternalServerError", message: "Error interno del servidor, intenta más tarde." });
    }
  }



  /**
   * funciones para la agenda
   * 1. crearactividad ////LISTO
   * 2. eliminar actividad///LISTO
   * 3. editar actividad///LISTO
   * 4. obtener actividades de un dia///LISTO
   * 5. obtener todas las actividades de un mes para generar los avisos de actividades en el cliente///LISTO
   * 6. (opcional) eliminar actividades que tengan mas de un mes en la agenda 
   */

  module.exports = {
    createActivity,
    deleteActivity,
    updateActivity,
    getActivityByDay,
    getActivityByMonth
  }