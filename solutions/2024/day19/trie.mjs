class Node {
  #value = "";
  #end = false;
  #children = new Map();

  constructor(value) {
    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  get children() {
    return this.#children;
  }

  get end() {
    return this.#end;
  }

  set end(end) {
    this.#end = end;
  }
}

class Trie {
  #children = new Map();

  add(str) {
    let children = this.#children;

    for (let i = 0; i < str.length; i++) {
      if (!children.has(str[i])) {
        children.set(str[i], new Node(str[i]));
      }
      if (i === str.length - 1) {
        children.get(str[i]).end = true;
      }

      children = children.get(str[i]).children;
    }
  }

  #findInner(str, index, dp) {
    let children = this.#children;
    let totalWays = 0;
    let i;

    if (dp.has(index)) return dp.get(index);

    for (i = index; i < str.length; i++) {
      const node = children.get(str[i]);
      if (!node) break;

      if (node.end) {
        if (i < str.length - 1) {
          totalWays += this.#findInner(str, i + 1, dp);
        } else {
          totalWays++;
        }
      }

      children = node.children;
    }

    dp.set(index, totalWays);
    return dp.get(index);
  }

  find(str) {
    return this.#findInner(str, 0, new Map());
  }
}

export default Trie;
