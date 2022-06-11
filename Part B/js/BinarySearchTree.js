class Node {
    constructor(initKey, initData, initParent, initLeft, initRight) {
        this.key = initKey;
        this.data = initData;
        this.parent = initParent;
        this.left = initLeft;
        this.right = initRight;
    }
};

export default class BinarySearchTree {
    constructor(initKeyLength) {
        this.root = null;
        this.size = 0;
        this.keyLength = initKeyLength;
    }

    // @todo - YOU MUST UPDATE THIS METHOD SO A KEY ONLY HAS LOWERCASE LETTERS, NO NUMBERS
    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 36);
            let randomChar;
            if (randomNum < 10) {
                randomNum += 48;
                randomChar = String.fromCharCode(randomNum);
            }
            else {
                randomNum += 55;
                randomChar = String.fromCharCode(randomNum);
            }
            key += randomChar;
        }
        return key;
    }

    // @completed
    putValue(key, value) {
        let dupKey = 0;
        if (this.root == null) // if the tree is empty, just insert node into root
        {
            let newNode = new Node(key, value, this.root, null, null);
            this.root = newNode;
            this.size++;
        } else {
            let compare = key.localeCompare(this.root.key); //if key is greater than we get a -1, if key is smaller than we get a 1
            if (compare == 0) // if root key is duplicate
            {                          // duplicate root key
                this.root.data = value;
            }
            else if (compare > 0) // given key is less than root node: MOVE TO THE LEFT(smaller #'s)
            {
                let preNode = this.root; // previous node
                let node = this.root.left; //current node(MOVED LEFT; SMALLER # BRANCH)
                let movedLeft = 1; // 1 = moved left; 0 = moved right
                if (node != null) compare = key.localeCompare(node.key);

                while (node != null) {
                    if (compare > 0) {
                        preNode = node;
                        node = node.left;
                        movedLeft = 1;
                        if (node != null) compare = key.localeCompare(node.key);
                    }
                    else if (compare < 0) {
                        preNode = node;
                        node = node.right;
                        movedLeft = 0;
                        if (node != null) compare = key.localeCompare(node.key);
                    }
                    else if (compare == 0) {
                        node.data = value;
                        dupKey = 1;
                        break;
                    }
                }
                if (!dupKey) {
                    let newNode = new Node(key, value, preNode, null, null);
                    node = newNode;
                    if (movedLeft) {
                        preNode.left = newNode;
                    }
                    else {
                        preNode.right = newNode;
                    }
                    this.size++;
                }
            }
            else if (compare < 0) // given key is more than root node: MOVE TO THE RIGHT
            {
                let preNode = this.root; // previous nod
                let node = this.root.right;
                let movedRight = 1; // 1 = moved right; 0 = moved left
                if (node != null) compare = key.localeCompare(node.key);

                while (node != null) {
                    if (compare < 0) {
                        preNode = node;
                        node = node.right;
                        movedRight = 1;
                        if (node != null) compare = key.localeCompare(node.key);
                    }
                    else if (compare > 0) {
                        preNode = node;
                        node = node.left;
                        movedRight = 0;
                        if (node != null) compare = key.localeCompare(node.key);
                    }
                    else if (compare == 0) {
                        node.data = value;
                        dupKey = 1;
                        break;
                    }
                }
                if (!dupKey) {
                    let newNode = new Node(key, value, preNode, null, null);
                    node = newNode;
                    if (movedRight) {
                        preNode.right = newNode;
                    }
                    else {
                        preNode.left = newNode;
                    }
                    this.size++;
                }
            }
        }
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        if (this.root != null) {
            let node = this.root;
            let compare = key.localeCompare(node.key);
            while (node != null) {
                if (compare == 0) // key found
                {
                    return node.data;
                }
                else if (compare < 0) // key is bigger than node(MOVE RIGHT)
                {
                    node = node.right;
                }
                else if (compare > 0) // key is smaller than node(MOVE LEFT
                {
                    node = node.left;
                }
                if (node != null) compare = key.localeCompare(node.key);
            }
        }
        return null;
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {

    }

    toStringRecursively(traveller, level) {
        let text = "";
        if (traveller.left != null)
            text += this.toStringRecursively(traveller.left, level + 1);
        for (let i = 0; i < level; i++) {
            text += "   ";
        }
        text += "   " + traveller.data.toString() + "\n";
        if (traveller.right != null)
            text += this.toStringRecursively(traveller.right, level + 1);
        return text;
    }

    toString() {
        return this.toStringRecursively(this.root, 0);
    }
}