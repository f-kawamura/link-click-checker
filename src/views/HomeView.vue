<script setup lang="ts">
/// <reference types="chrome"/>
import { onMounted, ref } from "vue";

const domainListState = ref([]);
const domainFormState = ref("");

onMounted(() => {
  fetchDomains();
});

const addSafeDomain = async () => {
  await chrome.storage.local.set({
    domains: [...domainListState.value, domainFormState.value],
  });

  await fetchDomains();
  domainFormState.value = "";
};

const deleteDomain = async (domain: string) => {
  await chrome.storage.local.set({
    domains: domainListState.value.filter((e: string) => e !== domain),
  });
  await fetchDomains();
};

const fetchDomains = async () => {
  await chrome.storage.local.get("domains").then(({ domains }) => {
    if (domains === undefined) return;
    domainListState.value = domains;
  });
};
</script>

<template>
  <div class="HomeView">
    <h2>Add safe doamin</h2>
    <input v-model="domainFormState" placeholder="safe.example.com" />
    <button @click="addSafeDomain">add</button>
    <ul>
      <li v-for="domain in domainListState" :key="domain">
        {{ domain }}
        <button @click="deleteDomain(domain)">remove</button>
      </li>
    </ul>
  </div>
</template>
