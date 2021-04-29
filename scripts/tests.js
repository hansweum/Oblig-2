
QUnit.test("Valgt stolpe er true", function (assert) {
    numbers = [7, 6, 3, 9]

    clicked(3)
    assert.equal(chosenBar, 3)
    clicked(1)
    assert.equal(chosenBar, 1)
    clicked(1)
    assert.equal(chosenBar, "ingen")
});

QUnit.test("Stolpe slettet", function (assert) {
    numbers = [7, 6, 3, 9]
    chosenBar = "1"
    deleteBar();
    assert.deepEqual(numbers, [6, 3, 9])
});

QUnit.test("Stolpe endret", function (assert) {
    numbers = [7, 6, 3, 9]
    chosenBar = "1"
    document.getElementById("number").value = "4"
    changeBar();
    assert.deepEqual(numbers, [4, 6, 3, 9])
});

QUnit.test("stolpe lagt til", function (assert) {
    numbers = [7, 6, 3, 9]
    document.getElementById("number").value = "2"
    addBar();
    assert.deepEqual(numbers, [7, 6, 3, 9, 2])
});