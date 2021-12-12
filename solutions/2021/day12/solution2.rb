def small_cave?(cave)
  cave.downcase == cave
end

def can_be_visited?(cave, visited, visitable_twice)
  return true if !small_cave?(cave) || visited.fetch(cave, 0) == 0
  return false if ['start', 'end'].include?(cave) || visited[cave] > 1

  visitable_twice.empty?
end

def distinct_paths(paths, cave = 'start', visited = {}, visitable_twice = [])
  return 1 if cave == 'end'
  return 0 unless can_be_visited?(cave, visited, visitable_twice)

  visited[cave] ||= 0
  visited[cave] += 1
  visitable_twice << cave if small_cave?(cave) && visited[cave] == 2

  total = 0

  paths[cave].each do |next_cave|
    total += distinct_paths(paths, next_cave, visited, visitable_twice)
  end

  visited[cave] -= 1
  visitable_twice.delete(cave)

  total
end

paths = {}
path = File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  cave1, cave2 = line.chomp.split('-')

  paths[cave1] ||= []
  paths[cave1] << cave2

  paths[cave2] ||= []
  paths[cave2] << cave1
end

puts distinct_paths(paths)