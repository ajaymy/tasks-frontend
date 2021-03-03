<template>
  <v-layout row wrap>
    <v-flex>
      <v-card color="blue-grey darken-2" class="white--text">
        <v-card-title>
          Tasks List
          <v-spacer></v-spacer>
          <!-- <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>-->
        </v-card-title>
        <v-data-table :headers="headers" :items="taskQueue">
          <template v-slot:items="props">
            <td>{{ props.item.project }}</td>
            <td class="text-xs-left">{{ props.item.task }}</td>
            <td class="text-xs-left">{{ props.item.projDate }}</td>
            <td class="text-xs-left">{{ props.item.startTime }}</td>
            <td class="text-xs-left">{{ props.item.endTime }}</td>
          </template>
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert
            >
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import utility from "@/components/utility";
import { bus } from "@/components/EventBus";
export default {
  data() {
    return {
      headers: [
        {
          text: "Project",
          align: "left",
          sortable: true,
          value: "project",
        },
        { text: "Task", value: "task" },
        { text: "Date", value: "projDate" },
        { text: "ST", value: "startTime" },
        { text: "ET", value: "endTime" },
      ],
      taskQueue: [],
      taskObj: {
        project: "",
        task: "",
        projDate: "",
        startTime: "",
        endTime: "",
      },
    };
  },
  mounted: function () {
    this.getTasksList();
    bus.$on("TasksList", (params) => {
      this.taskQueue = params.TaskList;
    });
  },
  methods: {
    getTasksList() {
      utility.getTaskList();
    },
  },
};
</script>