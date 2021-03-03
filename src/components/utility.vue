<template>
  <div></div>
</template>
<script>
import { bus } from "@/components/EventBus";
import Tasks from "@/Model/Tasks";
import axios from "axios";
import format, { isDate } from "date-fns";
import { parseISO } from "date-fns/fp";
export default {
  hostURL: process.env.VUE_APP_HOSTURL,
  projectObj: {
    projID: 0,
    projName: "",
  },
  clientObj: {
    clientID: 0,
    clientName: "",
  },
  projectlist: [],
  clientlist: [],
  tasklist: [],
  taskObj: {
    project: "",
    task: "",
    projDate: "",
    startTime: "",
    endTime: "",
  },

  getProjectList: async function () {
    let uri = `${this.hostURL}/projectlist`;
    let response = await axios.get(uri);
    let objects = JSON.parse(JSON.stringify(response.data));

    if (objects.length > 0) {
      objects.forEach((element) => {
        let thisArray = Object.assign({}, this.projectObj, {
          projID: element.projectID,
          projName: element.projectName,
        });
        this.projectlist.push(thisArray);
      });

      bus.$emit("ProjectLists", {
        projectlist: this.projectlist,
      });
    }
  },
  getClientList: async function () {
    let uri = `${this.hostURL}/clientlist`;
    let response = await axios.get(uri);
    let objects = JSON.parse(JSON.stringify(response.data));
    if (objects.length > 0) {
      objects.forEach((element) => {
        let thisArray = Object.assign({}, this.clientObj, {
          clientID: element.clientID,
          clientName: element.clientName,
        });
        this.clientlist.push(thisArray);
      });

      bus.$emit("ClientLists", {
        clientlist: this.clientlist,
      });
    }
  },
  addTaskInfo: async function (taskObj) {
    let param = {
      TaskName: taskObj.taskName,
      TaskDescription: taskObj.taskDescription,
      Project: taskObj.project,
      Client: taskObj.client,
      StartDate: taskObj.startDate,
      StartTime: taskObj.startTime,
      EndTime: taskObj.endTime,
      Remarks: "test",
    };

    let response = await axios.post(`${this.hostURL}/NewTask`, param);
    bus.$emit("TaskSaved", {
      response: response.data,
    });
  },
  getTaskList: async function () {
    this.tasklist = [];
    let response = await axios.get(`${this.hostURL}/taskslist`);
    let objects = JSON.parse(JSON.stringify(response.data));

    if (objects.length > 0) {
      objects.forEach((item) => {
        let thisArray = Object.assign({}, this.taskObj, {
          project: item.project,
          task: item.taskname,
          projDate: parseISO(item.startTime),
          startTime: item.startTime,
          endTime: item.endTime,
        });
        this.tasklist.push(thisArray);
      });
    }
    bus.$emit("TasksList", {
      TaskList: this.tasklist,
    });

    // if (objects.length > 0) {
    //   let task = null;
    //   objects.forEach((item) => {
    //     task = new Tasks();
    //     task.project = item.project;
    //     task.taskName = item.taskname;
    //     task.startDate = parseISO(item.startTime);
    //     task.startTime = item.startTime;
    //     task.endTime = item.endTime;
    //     this.tasklist.push(task);
    //     task = null;
    //   });
    //   console.log(this.tasklist);
    // }
  },
};
</script>