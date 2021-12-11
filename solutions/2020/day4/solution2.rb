required_fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
validations = [
  (1920..2002).map { |year| "(byr:#{year})" }.join('|'),
  (2010..2020).map { |year| "(iyr:#{year})" }.join('|'),
  (2020..2030).map { |year| "(eyr:#{year})" }.join('|'),
  (150..193).map { |height| "(hgt:#{height}cm)" }.join('|'),
  (59..76).map { |height| "hgt:#{height}in" }.join('|'),
  'hcl:#[0-9a-f]{6}',
  ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].map { |value| "(ecl:#{value})" }.join('|'),
  'pid:[0-9]{9}'
]

passports = ['']
valid_passports = 0

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  if line.chomp.empty?
    passports << ''
  else
    passports.last << " #{line.chomp}"
  end
end

passports.reject!(&:empty?)

passports.each do |passport|
  chunks = passport.split.select { |chunk| chunk.split(':').first != 'cid' }
  next if (chunks.map { |chunk| chunk.split(':').first } & required_fields).size != required_fields.size

  valid_passports += 1 if chunks.all? { |chunk| validations.any? { |validation| Regexp.new("^#{validation}$").match?(chunk) } }
end

puts valid_passports
