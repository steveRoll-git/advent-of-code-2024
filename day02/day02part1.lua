local count = 0

for l in io.lines("input") do
  local numbers = { l:match("(%d+) (%d+) (%d+) (%d+) (%d+) ?(%d*) ?(%d*) ?(%d*)") }
  for i = 1, #numbers do
    numbers[i] = tonumber(numbers[i])
  end
  local direction = numbers[2] > numbers[1]
  for i = 2, #numbers do
    local n1 = numbers[i - 1]
    local n2 = numbers[i]
    if n1 == n2 or n2 > n1 ~= direction or math.abs(n2 - n1) < 1 or math.abs(n2 - n1) > 3 then
      goto continue
    end
  end
  count = count + 1
  ::continue::
end

print(count)
