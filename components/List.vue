<script setup>
const { data } = await useFetch("https://swapi.dev/api/people");
const people = unref(data.value.results);
const gender = ref("all");
const isToggled = ref(false);
const x = ref(0);
const y = ref(0);
const wrapper = ref([]);

const filtered = computed(() => {
  return people.filter((person) => {
    const genderMatch =
      gender.value === "all" ? true : person.gender === gender.value;

    const birthYearMatch = isToggled.value
      ? parseInt(person.birth_year) >= 20 && parseInt(person.birth_year) <= 40
      : true;

    return genderMatch && birthYearMatch;
  });
});

const accessChildElements = (e) => {
  const children = wrapper.value.querySelectorAll(".card");
  children.forEach((child) => {
    const rect = child.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    child.style.setProperty("--mouse-x", `${x}px`);
    child.style.setProperty("--mouse-y", `${y}px`);
  });
};
</script>

<template>
  <div
    id="main_el"
    class="w-screen h-screen absolute top-0 overflow-x-hidden overflow-y-scroll md:overflow-hidden flex-col md:flex md:flex-row bg-transparent text-white"
  >
    <div class="w-100 md:w-1/4 pl-8">
      <div class="flex flex-col md:h-screen justify-center">
        <div class="flex items-center gap-4 m-2 mt-6 md:m-4 md:mb-8">
          <label for="switch1">20-40 bby</label>
          <ToggleSwitch v-model="isToggled" inputId="switch1" />
        </div>
        <div class="flex md:flex-col">
          <div class="flex items-center m-2 md:m-4">
            <RadioButton
              v-model="gender"
              inputId="all"
              name="all"
              value="all"
            />
            <label for="all" class="ml-2">All</label>
          </div>
          <div class="flex items-center m-2 md:m-4">
            <RadioButton
              v-model="gender"
              inputId="male"
              name="male"
              value="male"
            />
            <label for="male" class="ml-2">Male</label>
          </div>
          <div class="flex items-center m-2 md:m-4">
            <RadioButton
              v-model="gender"
              inputId="female"
              name="female"
              value="female"
            />
            <label for="female" class="ml-2">Female</label>
          </div>
          <div class="flex items-center m-2 md:m-4">
            <RadioButton
              v-model="gender"
              inputId="robot"
              name="robot"
              value="n/a"
            />
            <label for="robot" class="ml-2">Robot</label>
          </div>
        </div>
      </div>
    </div>

    <div class="w-100 md:w-3/4 md:overflow-y-scroll py-8 px-4 md:pr-8">
      <h1 id="title">
        <span>Star Wars Characters</span>
      </h1>
      <ul
        id="cards"
        ref="wrapper"
        @mousemove="accessChildElements"
        class="flex flex-wrap gap-2"
      >
        <li class="card" v-for="person in filtered" :key="person.name">
          <Person :person="person" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.p-radiobutton-checked .p-radiobutton-box {
  border-color: rgb(255, 199, 31) !important;
  background: rgba(255, 199, 31) !important;
}

.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
  background: rgba(255, 199, 31) !important;
}

.overflow-y-scroll {
  scrollbar-color: rgb(23, 23, 23) rgba(255, 255, 255, 0.1);
  scrollbar-width: thin;
}
</style>

<style lang="scss" scoped>
#title {
  color: #fff;
  font-family: "lato", sans-serif;
  font-weight: 300;
  font-size: 50px;
  letter-spacing: 10px;
  padding-left: 10px;
}

span {
  background: -webkit-linear-gradient(white, #38495a);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

#main_el {
  animation: showMainContent 1s ease-in-out forwards 9s;
  opacity: 0;
}

@keyframes showMainContent {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

#cards:hover > .card::after {
  opacity: 1;
}

.card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  height: 260px;
  flex-direction: column;
  position: relative;
  width: 300px;

  &:hover::before {
    opacity: 1;
  }

  &::before,
  &::after {
    border-radius: inherit;
    content: "";
    height: 100%;
    left: 0px;
    opacity: 0;
    position: absolute;
    top: 0px;
    transition: opacity 500ms;
    width: 100%;
  }

  &::before {
    background: radial-gradient(
      800px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 232, 31, 0.06),
      transparent 40%
    );
    z-index: 3;
  }

  &::after {
    background: radial-gradient(
      600px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 232, 31, 0.4),
      transparent 40%
    );
    z-index: 1;
  }

  & > .card-content {
    background-color: rgb(23, 23, 23);
    border-radius: inherit;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    inset: 1px;
    padding: 10px;
    margin: 3px;
    position: absolute;
    z-index: 2;
  }
}

@media (max-width: 1000px) {
  .card {
    flex-shrink: 1;
    width: calc(50% - 4px);
  }
}

@media (max-width: 320px) {
  .card {
    width: 100%;
  }
}
</style>
