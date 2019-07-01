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

    addForkCount(tree = [], level = 0) {
        level++; // 进入一层递归相当于进入下一级
        tree.forEach(child => {
            let pathCount = this.pathCount;
            Object.keys(child).forEach(key => {

                if (child[key] instanceof Array) { // 通配约定Array类型为子级(暂不支持连空Array都没有的数据结构)
                    if (child[key].length === 0) { // 到达当前树径的尽头
                        this.pathCount++;
                    } else { // 仍有子级继续递归
                        this.addForkCount(child[key], level);
                    }
                }
            });
            child.forkCount277013309X = this.pathCount - pathCount;
        });

        level--; // 退出一层递归相当于回到父级

        if (level === 0) { // 表示递归结束
            console.log(tree);
        }
    }

    parseTree(tree = [], level = 0, nodePath = {}, nodeList = []) {
        level++; // 进入一层递归相当于进入下一级
        tree.forEach(child => {
            Object.keys(child).forEach(key => {
                let nodePathNew = Object.assign({}, nodePath);

                if (child[key] instanceof Array) { // 通配约定Array类型为子级(暂不支持连空Array都没有的数据结构)
                    if (child[key].length === 0) { // 到达当前树径的尽头
                        nodeList.push(nodePathNew);
                    } else { // 仍有子级继续递归
                        this.parseTree(child[key], level, nodePathNew, nodeList);
                    }
                } else { // 追加
                    nodePath[key + level] = child[key];
                }
            });
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
