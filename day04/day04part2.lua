local rows = {}

for l in io.lines("input") do
  table.insert(rows, l)
end

local function at(x, y)
  return rows[y]:sub(x, x)
end

local function cw(x, y)
  return y, -x
end

local width = #rows[1]
local height = #rows

local directions = {
  { x = 1,  y = 1 },
  { x = -1, y = 1 },
  { x = -1, y = -1 },
  { x = 1,  y = -1 },
}

local count = 0

for y = 2, height - 1 do
  for x = 2, width - 1 do
    if at(x, y) == "A" then
      for _, d in ipairs(directions) do
        local dx, dy = d.x, d.y
        local dx2, dy2 = cw(d.x, d.y)
        local dx3, dy3 = cw(cw(d.x, d.y))
        local dx4, dy4 = cw(cw(cw(d.x, d.y)))
        if
            at(x + dx, y + dy) == "M" and
            at(x + dx2, y + dy2) == "M" and
            at(x + dx3, y + dy3) == "S" and
            at(x + dx4, y + dy4) == "S" then
          count = count + 1
          break
        end
      end
    end
  end
end

print(count)
