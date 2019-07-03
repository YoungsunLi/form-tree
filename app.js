import treeData from "./tree_data.js";

class App {
    pathCount = 0; // 记录总树径个数

    run() {
        this.addForkCount(treeData);

        let nodeList = this.parseTree(treeData) || [];
        nodeList.forEach(node => {
            console.log(node);
        })
    };

    addForkCount(tree = []) {
        tree.forEach(child => {
            let pathCount = this.pathCount;
            Object.values(child).forEach(value => {
                if (value instanceof Array) { // 通配约定Array类型为子级(暂不支持连空Array都没有的数据结构)
                    if (value.length === 0) { // 到达当前树径的尽头
                        this.pathCount++;
                    } else { // 仍有子级继续递归
                        this.addForkCount(value);
                    }
                }
            });
            child.forkCount277013309X = this.pathCount - pathCount;
        });
    }

    parseTree(tree = [], level = 0, nodePath = {}, nodeList = []) {
        level++; // 进入一层递归相当于进入下一级
        tree.forEach(child => {
            let childTemp = [];
            let nodePathNew = Object.assign({}, nodePath);
            Object.keys(child).forEach(key => {
                if (child[key] instanceof Array) { // 通配约定Array类型为子级(暂不支持连空Array都没有的数据结构)
                    nodePath = {}; // 清空会产生冗余的数据
                    for (let i = 1; i < level; i++) { // 给不满一行的数据提供标识
                        nodePath['isHide277013309X' + i] = true;
                    }
                    if (child[key].length === 0) { // 到达当前树径的尽头
                        nodeList.push(nodePathNew);
                    } else {
                        childTemp = child[key]; // 暂存'children' 等当前节点全部遍历完再递归
                    }
                } else { // 追加
                    nodePathNew[key + level] = child[key];
                }
            });

            if (childTemp.length > 0) { // 如果上面有进行暂存'children' 则进入递归
                this.parseTree(childTemp, level, nodePathNew, nodeList);
            }
        });

        level--; // 退出一层递归相当于回到父级

        if (level === 0) { // 表示递归结束
            return nodeList;
        }
    }
}

window.onload = () => {
    const app = new App();
    app.run();
};
