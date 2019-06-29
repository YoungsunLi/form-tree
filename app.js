import treeData from "./tree_data.js";

class App {
    run() {
        this.findChild(treeData);
    };

    findChild(tree, level = 0) {
        level++; // 进入一层递归相当于进入下一级
        tree.forEach(child => {
            console.log(child.name);

            if (child.children.length === 0) { // 到达当前树杈的尽头

            } else {
                this.findChild(child.children, level); // 仍有子级继续递归
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
