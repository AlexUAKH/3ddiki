<script setup lang="ts"></script>

<template>
  <v-dialog max-width="700">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        text="* шпоргалка по основному синтаксису Markdown"
        variant="text"
        class="pl-0"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-text> </v-card-text>
        <ul class="text-title-small text-md-title-large">
          <li>
            <span class="font-weight-bold">Заголовки:</span> от # (H1) до ######
            (H6)
          </li>
          <li>
            <span class="font-weight-bold">Жирный текст:</span> **текст** или
            __текст__
          </li>
          <li>
            <span class="font-weight-bold">Курсив:</span> *текст* или _текст_
          </li>
          <li>
            <span class="font-weight-bold">Зачеркнутый текст:</span> ~~текст~~
          </li>
          <li>
            <span class="font-weight-bold">Маркированный список:</span> - пункт,
            * пункт или + пункт
          </li>
          <li>
            <span class="font-weight-bold">Нумерованный список:</span> 1. пункт
          </li>
          <li>
            <span class="font-weight-bold">Ссылки:</span> [текст
            ссылки](https://example.com)
          </li>
          <li>
            <span class="font-weight-bold">Изображения:</span>
            ![описание](ссылка_на_картинку.jpg)
          </li>
          <li><span class="font-weight-bold">Цитаты:</span> > Текстцитаты</li>
          <li><span class="font-weight-bold">Код в тексте:</span> `код`</li>
          <li>
            <span class="font-weight-bold">Блоки кода:</span> обернуты в тройные
            обратные кавычки (```)
          </li>
          <li>
            <span class="font-weight-bold">Таблицы:</span> через вертикальные
            черты | и дефисы -
          </li>
        </ul>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
