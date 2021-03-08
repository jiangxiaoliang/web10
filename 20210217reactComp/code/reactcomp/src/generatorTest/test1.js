function* g() {
    yield 'a'
    yield 'b'
    yield 'c'
    yield 'd'
}

const gen = g()

function next() {
    let { value, done } = gen.next()
    console.log(value)
    if (!done) next()
}

next()