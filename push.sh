res=$(git push 2>&1 | grep 'fatal')

while [ ! -z "$res" ]
do
    res=$(git push 2>&1 | grep 'fatal')
    echo $res
    sleep 1
done