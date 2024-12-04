local rows = {}

for l in io.lines("input") do
  table.insert(rows, l)
end

local function at(x, y)
  return rows[y]:sub(x, x)
end

local width = #rows[1]
local height = #rows

local directions = {
  { x = 1,  y = 0 },
  { x = 1,  y = 1 },
  { x = 0,  y = 1 },
  { x = -1, y = 1 },
  { x = -1, y = 0 },
  { x = -1, y = -1 },
  { x = 0,  y = -1 },
  { x = 1,  y = -1 },
}

local sequence = { "X", "M", "A", "S" }

local count = 0

for y = 1, height do
  for x = 1, width do
    for _, d in ipairs(directions) do
      local ex = x + d.x * (#sequence - 1)
      local ey = y + d.y * (#sequence - 1)
      if ex >= 1 and ex <= width and ey >= 1 and ey <= height then
        local cx, cy = x, y
        local i = 1
        while at(cx, cy) == sequence[i] do
          i = i + 1
          cx = cx + d.x
          cy = cy + d.y
          if i == #sequence + 1 then
            count = count + 1
            break
          end
        end
      end
    end
  end
end

print(count)
