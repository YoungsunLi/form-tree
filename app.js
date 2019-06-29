import treeData from "./tree_data.js";

class App {
    run() {
        this.findChild(treeData);
    };

    findChild(tree, level = 0, nodePath = {}) {
        level++; // 进入一层递归相当于进入下一级
        tree.forEach(child => {
            Object.keys(child).forEach(key => {
                if (key !== 'children') { // 适合子级字段用'children'的多叉树数据
                    nodePath[key + level] = child[key];
                }
            });

            if (child.children.length === 0) { // 到达当前树径的尽头
                console.log(nodePath);
            } else {
                let nodePathNew = Object.assign({}, nodePath);
                this.findChild(child.children, level, nodePathNew); // 仍有子级继续递归
            }
        });

        level--; // 退出一层递归相当于回到父级

        if (level === 0) { // 表示递归结束
            console.log("done");
        }
    }
}

window.onload = () => {
    const app = new App();
    app.run();
};
