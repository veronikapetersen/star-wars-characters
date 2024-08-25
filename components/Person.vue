<script setup>
defineProps({
  person: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <Card class="card-content">
    <template #title>
      <h2>{{ person.name }}</h2>
    </template>
    <template #content>
      <p v-if="person.gender === 'n/a'">Robot, {{ person.height }} cm tall</p>
      <p v-else>
        {{ person.gender.charAt(0).toUpperCase() + person.gender.slice(1) }},
        {{ person.height }} cm tall
      </p>

      <p v-if="person.hair_color === 'none'">Bold</p>
      <p
        v-else-if="person.hair_color !== 'n/a' && person.hair_color !== 'none'"
      >
        {{
          person.hair_color.charAt(0).toUpperCase() + person.hair_color.slice(1)
        }}
        hair
      </p>

      <p>
        {{
          person.eye_color.charAt(0).toUpperCase() + person.eye_color.slice(1)
        }}
        eyes
      </p>

      <p v-if="person.birth_year !== 'unknown'">
        Born in: {{ person.birth_year }}
      </p>
      <p>Number of films: {{ person.films.length }}</p>
      <p>
        Created:
        {{ new Date(person.created).toLocaleDateString("en-GB") }}
      </p>
    </template>
  </Card>
</template>

<style scoped lang="scss">
.card-content {
  background: transparent;
  box-shadow: none;
  color: inherit;
}
</style>
