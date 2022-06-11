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
        if (this.root != null) {
            let compare = key.localeCompare(this.root.key);
            if (compare == 0) { // 3 CASES: 0 CHILDREN, 1 CHILD, 2 CHILDREN:
                if ((this.root.left == null) && (this.root.right == null)) { // do nothing, root node has been deleted
                    this.root = null;
                }
                else if ((this.root.left != null) && (this.root.right != null)) {
                    // two children
                    let node = root.right;
                    if (node.left != null) {
                        let node = findMinRight(this.root); // node to replace root with
                        this.root.data = node.data;
                        this.root.key = node.key;
                        if (node.right != null) // if node that is replaced has a right branch(connect it to previous node)
                        {
                            let befNode = findPrevMinRight(this.root); // get node before replaced node
                            befNode.left = node.right;            // reconnect right branch from replaced node with the node before it

                            node = null;
                            this.size--;
                        }
                        else {
                            let befNode = findPrevMinRight(this.root); // get the node before the replaced node
                            befNode.left = null;                // disconnect the branch on the left side
                            node = null;
                            this.size--;
                        }
                    }
                    else {
                        this.root.data = node.data;
                        this.root.key = node.key;
                        this.root.right = node.right;
                        this.size--;
                    }
                }
                else if ((this.root.left != null) || (this.root.right != null)) { // 1 child
                    if (this.root.left != null) {
                        this.root = this.root.left;
                    }
                    else {
                        this.root = this.root.right;
                    }
                }
            }
            else {
                let preNode = this.root;
                let node = this.root;
                let movedLeft = 0; // 1 = left; 0 = right
                if (node != null) compare = key.localeCompare(node.key);
                if (compare > 0) {
                    node = node.left;
                    movedLeft = 1;
                }
                else {
                    node = node.right;
                    movedLeft = 0;
                }
                if (node != null) compare = key.localeCompare(node.key);
                while (node != null) // search through tree until we find the node to remove
                {
                    if (compare == 0) // key found now we remove da node
                    {
                        if ((node.left != null) && (node.right != null)) // two children
                        {                                                        // two children
                            let newNode = node.right;                         // get the right node of the node to  be deleted
                            if (newNode.left != null)                        // check if the right node of the TBD node exists(so we can find replaced node)
                            {
                                let rNode = findMinRight(node); // node to replace root with (rNode)
                                node.data = rNode.data;
                                node.key = rNode.key;      // replace the deleted node data with the new replaced node data
                                if (rNode.right != null) // if node that is replaced has a right branch(connect it to previous node)
                                {
                                    let befNode = findPrevMinRight(node); // get node before replaced node
                                    befNode.left = rNode.right;           // reconnect right branch from replaced node with the node before it

                                    if (movedLeft) {
                                        preNode.left = node;
                                    }
                                    else {
                                        preNode.right = node;
                                    }
                                }
                                else {
                                    let befNode = findPrevMinRight(node); // get the node before the replaced node
                                    befNode.left = null;                // disconnect the branch on the left side
                                }
                                node = null;
                                this.size--;
                            }
                            else {
                                newNode.left = node.left;
                                if (movedLeft) {
                                    preNode.left = newNode;
                                }
                                else {
                                    preNode.right = newNode;
                                }
                                node = null;
                                this.size--;
                            }
                        }
                        else if ((node.left != null) || (node.right != null)) // 1 child
                        {
                            if (movedLeft) {
                                if (node.left != null) {
                                    preNode.left = node.left;
                                }
                                else {
                                    preNode.left = node.right;
                                }
                            }
                            else {
                                if (node.left != null) {
                                    preNode.right = node.left;
                                }
                                else {
                                    preNode.right = node.right;
                                }
                            }
                            node = null;
                            this.size--;
                        }
                        else // no children
                        {
                            if (movedLeft) {
                                preNode.left = null;
                                node = null;
                                this.size--;
                            }
                            else {
                                preNode.right = null;
                                node = null;
                                this.size--;
                            }
                        }
                    }
                    else if (compare < 0) // key is bigger than node(MOVE RIGHT)
                    {
                        preNode = node;
                        node = node.right;
                        movedLeft = 0;
                        if (node != null) compare = key.localeCompare(node.key);
                    }
                    else if (compare > 0) // key is smaller than node(MOVE LEFT
                    {
                        preNode = node;
                        node = node.left;
                        movedLeft = 1;
                        if (node != null) compare = key.localeCompare(node.key);
                    }
                }
            }
        }

    }

    findMinRight(node) // Find min node of the right branch of the given root/node
    {
        let prevNode = node.right;
        let node1 = node.right;
        while (node1 != null) {
            prevNode = node1;
            node1 = node1.left;
        }
        return prevNode;
    }

    findPrevMinRight(node) // Find min node of the right branch of the given root/node
    {
        let ppreNode = node.right;
        let prevNode = node.right;
        let node1 = node.right;
        while (node1 != null) {
            ppreNode = prevNode;
            prevNode = node1;
            node1 = node1.left;
        }
        return ppreNode;
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