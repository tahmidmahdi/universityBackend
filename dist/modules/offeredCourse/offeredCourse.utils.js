"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasTimeConflict = void 0;
const hasTimeConflict = (assignedSchedules, newScheduleTime) => {
    for (const schedule of assignedSchedules) {
        const existingStartTime = new Date(`1996-01-01T${schedule.startTime}`);
        const existingEndTime = new Date(`1996-01-01T${schedule.endTime}`);
        const newStartingTime = new Date(`1996-01-01T${newScheduleTime.startTime}`);
        const newEndTime = new Date(`1996-01-01T${newScheduleTime.endTime}`);
        if (newStartingTime < existingEndTime && newEndTime > existingStartTime) {
            return true;
        }
    }
    return false;
};
exports.hasTimeConflict = hasTimeConflict;
