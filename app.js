import treeData from "./tree_data.js";

class App {
    pathCount = 0; // 记录总树径个数(非节点个数)

    forkCountKey = 'forkCount277013309'; // 取一个跟自己实际数据不存的key值
    isHideKey = 'isHide277013309'; // 取一个跟自己实际数据不存的key值

    run() {
        this.addForkCount(treeData);

        let nodeList = this.parseTree(treeData) || [];
        nodeList.forEach(node => {
            console.log(node);
        })
    };

    /**
     * 计算每个节点的树径个数(即rowSpan数)并添加到原tree
     * @param tree
     */
    addForkCount(tree = []) {
        tree.forEach(child => {
            // 记录进入一个节点时的树径个数
            let pathCount = this.pathCount;

            Object.values(child).forEach(value => {
                // 通配约定Array类型为子级(暂不支持连空Array都没有的数据结构)
                if (value instanceof Array) {
                    // 到达当前树径的尽头
                    if (value.length === 0) {
                        // 记录一个树径
                        this.pathCount++;
                    } else { // 仍有子级继续递归
                        this.addForkCount(value);
                    }
                }
            });

            // 通过计算离开当前节点的树径个数减去进入时的个数 得到当前节点子树径个数
            child[this.forkCountKey] = this.pathCount - pathCount;
        });
    }

    /**
     * 展开树
     * @param tree 待展开的树
     * @param level 层深
     * @param nodePath 树径
     * @param nodeList 展开后的数据(数据的key = [原来的key] + '_' + [层深]  如：name_3)
     * @returns {Array} nodeList
     */
    parseTree(tree = [], level = 0, nodePath = {}, nodeList = []) {
        level++; // 进入一层递归相当于进入下一级
        tree.forEach(child => {
            let childTemp = [];

            // 深拷贝一个新的树径(防止对象的引用传递)
            let nodePathNew = Object.assign({}, nodePath);

            Object.keys(child).forEach(key => {
                // 通配约定Array类型为子级(暂不支持连空Array都没有的数据结构)
                if (child[key] instanceof Array) {
                    nodePath = {}; // 清空会产生冗余的数据

                    // 标记冗余的数据
                    for (let i = 1; i < level; i++) {
                        nodePath[this.isHideKey + '_' + i] = true;
                    }

                    // 到达当前树径的尽头
                    if (child[key].length === 0) {
                        // 记录一条树径
                        nodeList.push(nodePathNew);
                    } else { // 暂存'children' 等当前节点全部遍历完再递归
                        childTemp = child[key];
                    }
                } else { // 追加当前节点数据到树径
                    nodePathNew[key + '_' + level] = child[key];
                }
            });
            // 如果上面有进行暂存'children' 则进入递归
            if (childTemp.length > 0) this.parseTree(childTemp, level, nodePathNew, nodeList);
        });

        level--; // 退出一层递归相当于回到父级

        // 表示递归结束
        if (level === 0) {
            return nodeList;
        }
    }
}

window.onload = () => {
    const app = new App();
    app.run();
};
