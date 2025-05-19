const Agenda = require("../models/agenda");

async function createActivity(req, res) {

  try {
    
  
    const {
      user_id,
      time,
      day,
      month,
      year,
      description
    } = req.body;
  
    if ( !user_id || !time || !day || !month || !year || !description) return res.status(400).send({ msg: "all fields are required" });
  
    const agenda = new Agenda({
      user_id,
      time,
      day,
      month,
      year,
      description
    });
  
    await agenda.save((error, userStorage) => {
      if (error) {
        res.status(500).send({ msg: "Error creating the activity" });
        console.log(error);
      } else {
        res.status(200).send({ msg: "activity created succesfully ", userStorage} );
      }
    });
  } catch (error) {
    console.error("Error creating the activity:", error);
    res.status(500).send({ msg: "Error creating the activity" });
  }
  
  }

  async function deleteActivity(req, res) {
    const { _id } = req.params;
  
    try {
      const deleteActivity = await Agenda.findOneAndDelete({ _id });
  
      if (!deleteActivity) {
        res.status(500).send({ msg: "failure deleting the activity" });
      } else {
        res.status(200).send({ msg: "activity deleted" });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function updateActivity(req, res) {
    const {
      _id,
      time,
      description
    } = req.body;

    console.log(req.body);
  
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
        res.status(500).send({ msg: "error updating the activity" });
      } else {
        res.status(200).send({ msg: "the activity was updated succesfully"});
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function getActivityByDay(req, res) {
    const { user_id, day, month, year } = req.query;
    if(!user_id || !day || !month || !year) return res.status(400).send({msg: "all fields are required"});

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
      return res.status(500).send({ msg: "error getting the activities" });
    }
  }

  async function getActivityByMonth(req, res) {
    const {user_id, month, year} = req.query;
    if(!user_id || !month || !year) return res.status(400).send({msg: "all fields are required"});

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
      return res.status(500).send({ msg: "Error al obtener las actividades" });
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