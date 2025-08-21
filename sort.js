let bars = [];

    function generateBars(num = 30) {
      const barsContainer = document.getElementById("bars");
      barsContainer.innerHTML = "";
      bars = [];
      for (let i = 0; i < num; i++) {
        const value = Math.floor(Math.random() * 100) + 10;
        bars.push(value);
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value * 3 + "px";
        barsContainer.appendChild(bar);
      }
    }

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function bubbleSort() {
      const barElements = document.querySelectorAll(".bar");
      for (let i = 0; i < bars.length; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
          barElements[j].classList.add("active");
          barElements[j + 1].classList.add("active");
          if (bars[j] > bars[j + 1]) {
            [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];
            barElements[j].style.height = bars[j] * 3 + "px";
            barElements[j + 1].style.height = bars[j + 1] * 3 + "px";
          }
          await sleep(50);
          barElements[j].classList.remove("active");
          barElements[j + 1].classList.remove("active");
        }
      }
    }

    async function selectionSort() {
      const barElements = document.querySelectorAll(".bar");
      for (let i = 0; i < bars.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < bars.length; j++) {
          barElements[j].classList.add("active");
          if (bars[j] < bars[minIdx]) minIdx = j;
          await sleep(50);
          barElements[j].classList.remove("active");
        }
        [bars[i], bars[minIdx]] = [bars[minIdx], bars[i]];
        barElements[i].style.height = bars[i] * 3 + "px";
        barElements[minIdx].style.height = bars[minIdx] * 3 + "px";
      }
    }

    async function insertionSort() {
      const barElements = document.querySelectorAll(".bar");
      for (let i = 1; i < bars.length; i++) {
        let key = bars[i];
        let j = i - 1;
        while (j >= 0 && bars[j] > key) {
          bars[j + 1] = bars[j];
          barElements[j + 1].style.height = bars[j + 1] * 3 + "px";
          j--;
          await sleep(50);
        }
        bars[j + 1] = key;
        barElements[j + 1].style.height = bars[j + 1] * 3 + "px";
      }
    }

    async function mergeSortHelper(start, end, barElements) {
      if (start >= end) return;
      const mid = Math.floor((start + end) / 2);
      await mergeSortHelper(start, mid, barElements);
      await mergeSortHelper(mid + 1, end, barElements);

      let left = bars.slice(start, mid + 1);
      let right = bars.slice(mid + 1, end + 1);
      let i = 0, j = 0, k = start;

      while (i < left.length && j < right.length) {
        bars[k] = left[i] <= right[j] ? left[i++] : right[j++];
        barElements[k].style.height = bars[k] * 3 + "px";
        await sleep(50);
        k++;
      }
      while (i < left.length) {
        bars[k] = left[i++];
        barElements[k].style.height = bars[k] * 3 + "px";
        await sleep(50);
        k++;
      }
      while (j < right.length) {
        bars[k] = right[j++];
        barElements[k].style.height = bars[k] * 3 + "px";
        await sleep(50);
        k++;
      }
    }

    async function mergeSort() {
      await mergeSortHelper(0, bars.length - 1, document.querySelectorAll(".bar"));
    }

    async function quickSortHelper(start, end, barElements) {
      if (start >= end) return;
      let pivot = bars[end];
      let i = start - 1;
      for (let j = start; j < end; j++) {
        if (bars[j] < pivot) {
          i++;
          [bars[i], bars[j]] = [bars[j], bars[i]];
          barElements[i].style.height = bars[i] * 3 + "px";
          barElements[j].style.height = bars[j] * 3 + "px";
          await sleep(50);
        }
      }
      [bars[i + 1], bars[end]] = [bars[end], bars[i + 1]];
      barElements[i + 1].style.height = bars[i + 1] * 3 + "px";
      barElements[end].style.height = bars[end] * 3 + "px";
      await sleep(50);

      await quickSortHelper(start, i, barElements);
      await quickSortHelper(i + 2, end, barElements);
    }

    async function quickSort() {
      await quickSortHelper(0, bars.length - 1, document.querySelectorAll(".bar"));
    }

    async function sort() {
      const algo = document.getElementById("algorithm").value;
      if (algo === "bubble") await bubbleSort();
      else if (algo === "selection") await selectionSort();
      else if (algo === "insertion") await insertionSort();
      else if (algo === "merge") await mergeSort();
      else if (algo === "quick") await quickSort();
    }

    // Generate bars on load
    generateBars();
  