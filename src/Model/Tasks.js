"use strict";
class Tasks {
    constructor() {
        this._taskName;
        this._taskDescription;
        this._project;
        this._client;
        this._startDate
        this._startTime;
        this._endTime;
        this._remarks;
    }
    set taskName(taskname) {
        this._taskName = taskname.charAt(0).toUpperCase() + taskname.slice(1);
    }
    get taskName() {
        return this._taskName;
    }
    set taskDescription(taskDescription) {
        this._taskDescription = taskDescription;
    }
    get taskDescription() {
        return this._taskDescription;
    }
    set project(project) {
        this._project = project;
    }
    get project() {
        return this._project;
    }
    set client(client) {
        this._client = client;
    }
    get client() {
        return this._client;
    }
    set startDate(startDate) {
        this._startDate = startDate;
    }
    get startDate() {
        return this._startDate;
    }

    set startTime(startTime) {
        this._startTime = startTime;
    }
    get startTime() {
        return this._startTime;
    }

    set endTime(endTime) {
        this._endTime = endTime;
    }
    get endTime() {
        return this._endTime;
    }
    set remarks(remarks) {
        this._remarks = remarks;
    }
    get remarks() {
        return this._remarks;
    }


}
module.exports = Tasks;