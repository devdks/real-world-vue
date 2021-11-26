<template>
  <h1>Create an event</h1>

  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <label for="newCategory">Select a category: </label>
      <select id="newCategory" v-model="event.category" required>
        <option value="" disabled selected>Select a category...</option>
        <option
          v-for="option in categories"
          :value="option"
          :key="option"
          :selected="option === event.category"
        >
          {{ option }}
        </option>
      </select>

      <h3>Name & describe your event</h3>
      <div class="form-field">
        <label for="newTitle">Title</label>
        <input
          id="newTitle"
          type="text"
          v-model="event.title"
          placeholder="Title"
        />
      </div>

      <div class="form-field">
        <label for="newDescription">Description</label>
        <input
          id="newDescription"
          type="text"
          v-model="event.description"
          placeholder="Description"
        />
      </div>

      <h3>Where is your event ?</h3>

      <div class="form-field">
        <label for="newLocation">Location</label>
        <input
          id="newLocation"
          type="text"
          v-model="event.location"
          placeholder="Location"
        />
      </div>

      <h3>When is your event ?</h3>

      <div class="form-field">
        <label for="newDate">Date</label>
        <input
          id="newDate"
          type="text"
          v-model="event.date"
          placeholder="dd/mm/yyyy"
        />
      </div>

      <div class="form-field">
        <label for="newTime">Time</label>
        <input
          id="newTime"
          type="text"
          v-model="event.time"
          placeholder="Time"
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid"

export default {
  data() {
    return {
      categories: [
        "sustainability",
        "nature",
        "animal welfare",
        "housing",
        "education",
        "food",
        "community",
      ],
      event: {
        id: "",
        category: "",
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        organizer: "",
      },
    }
  },
  methods: {
    onSubmit() {
      const event = {
        ...this.event,
        id: uuidv4(),
        organizer: this.$store.state.user,
      }
      /* this.event.id = uuidv4()
      this.event.organizer = this.$store.state.user */
      console.log("Event:", event)
      this.$store
        .dispatch("createEvent", event)
        .then(() => {
          this.$router.push({
            name: "EventDetails",
            params: { id: event.id },
          })
        })
        .catch(() => {
          return {
            name: "NetworkError",
          }
        })
    },
  },
}
</script>

<style scoped>
.form-container {
  width: 90vw;
  max-width: 768px;
  border: 1px solid #ddd;
  padding: 3vw;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  margin: 0 auto;
  justify-content: center;
}

h3 {
  margin: 0.8em auto;
  color: #42b983;
  opacity: 0.7;
}

.form-field {
  box-sizing: border-box;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

select:required:invalid {
  color: #b2aba1;
  opacity: 0.5;
}

select {
  border-radius: 5px;
  border: 1px solid #2c3e50;
  padding: 0.5em 0.6em;
}

option[value=""][disabled] {
  display: none;
}

select:required:valid {
  text-transform: capitalize;
}

label {
  min-width: 110px;
  font-size: 1.1em;
  /* margin-right: 0.3em; */
}

input {
  /* display: inline-block; */
  border-radius: 5px;
  border: 1px solid #2c3e50;
  min-width: 500px;
  margin: 1em auto;
  padding: 0.5em;
  flex: 2;
}

button {
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5em 1.5em;
}
</style>
