<template functional>
  <ul style="text-align: center">
    <li v-for="(item, index) in props.funcList" :key="index" >
      <button @click="props.minusList(item)">-</button>
      {{ item.count }}
      <button @click="props.addList(item)">+</button>
    </li>
  </ul>
</template>


